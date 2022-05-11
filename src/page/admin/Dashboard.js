import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { API_DASHBOARD, SEND_POST_REQUEST } from "../../utils/API";
import { fNumber, fPrice, fShortDate, fSimpleDate } from "../../utils/uFormatter";
import { useTranslation } from "react-i18next";
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Icon } from "@iconify/react";
import Page from "../../component/Page";
import useAuth from "../../hook/useAuth";
import EbarimtInvoiceModal from "./EbarimtModal";

export default function Dashboard() {
    const { t } = useTranslation();
    const {user} = useAuth();
    const [viewEbarimt,setViewEbarimt] = useState(false);
    const [invoiceID,setInvoiceID] = useState('');
    const [activeIndex, setActiveIndex] = useState(0);
    const [sentInfo, setSentInfo] = useState({ amount: 0, data: [] });
    const [receiveInfo, setReceiveInfo] = useState({ amount: 0, data: [] });
    const [cabinetInfo, setCabinetInfo] = useState({ allVendors: 0, activeVendor: 0, activeVendorPercent: 100, allProducts: 0, available: 0, activeProductPercent: 100, totalTrx:0, totalMe:0,spent:0,received:0 });
    const [systemChartData, setSystemChartData] = useState({});
    const [invoices, setInvoices] = useState([]);
    const onPieEnter = (_, index) => {
        setActiveIndex(index);
    }
    useEffect(() => {
        
        async function information() {
            const _vendor = await SEND_POST_REQUEST(API_DASHBOARD.getSystemInformation, {});
            const _sent = await SEND_POST_REQUEST(API_DASHBOARD.getSentChart, {});
            const _receive = await SEND_POST_REQUEST(API_DASHBOARD.getReceiveChart, {});
 
            // if (_invoices.status === 200) {

            //     setInvoices(_invoices.data.list);
            // }
            if (_vendor.status === 200) {
                const _vendorData = _vendor.data;
                const _trxData = _vendorData.allPayHistory;
                
                setInvoices(_vendorData.allPayHistory.filter((invoice)=>(invoice.receiver === user._id)));
                const info = {
                    allVendors: _vendorData.allVendors.length,
                    activeVendor: _vendorData.allVendors.filter(c => c.status === "active").length,
                    allProducts: _vendorData.allProducts.length,
                    available: _vendorData.allProducts.filter(b => b.status === 1).length,
                    inactive: _vendorData.allProducts.filter(b => b.status === 0).length,
                    totalTrx: _trxData.reduce((val,item)=>(item.cost + val),0),
                    totalMe: _trxData.reduce((val,item)=>( ((item.receiver === user._id || item.payer===user._id)? item.cost :0) + val),0),
                    spent: _trxData.reduce((val,item)=>( ((item.payer===user._id)? item.cost :0) + val),0),
                    received: _trxData.reduce((val,item)=>( ((item.receiver === user._id)? item.cost :0) + val),0),
                }
                
                info.activeProductPercent = fNumber((info.available / Math.max(1, info.allProducts)) * 100);
                info.activeVendorPercent = fNumber((info.activeVendor / Math.max(1, info.allVendors)) * 100);
                setCabinetInfo(info);
                setSystemChartData([

                    { key: `${t('dashboard.filled')}`, value: info.available },
                    { key: `${t('dashboard.empty')}`, value: info.inactive },
                ])
                
            }
            if (_sent.status === 200) {
                const _sentData = _sent.data.months;
                let amount = 0;
                _sentData.forEach((d) => { amount += d.total });
                setSentInfo({ amount, data: _sentData });
                
            }
            if (_receive.status === 200) {
                const _receiveData = _receive.data.months;
                let amount = 0;
                _receiveData.forEach((d) => { amount += d.total });
                setReceiveInfo({ amount, data: _receiveData });
                
            }
        }
        information();
    }, [t]);
    const renderActiveShape = (props) => {
        const RADIAN = Math.PI / 180;
        const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
        const sin = Math.sin(-RADIAN * midAngle);
        const cos = Math.cos(-RADIAN * midAngle);
        const mx = cx + (outerRadius) * cos;
        const my = cy + (outerRadius ) * sin;
        const ex = mx + (cos >= 0 ? 1 : -1) * 22;
        const ey = my;
        const textAnchor = cos >= 0 ? 'start' : 'end';

        return (
            <g>
                <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
                    {payload.key}:{payload.value}
                </text>
                <Sector
                    cx={cx}
                    cy={cy}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    fill={fill}
                />
                <Sector
                    cx={cx}
                    cy={cy}
                    startAngle={startAngle}
                    endAngle={endAngle}
                    innerRadius={outerRadius + 6}
                    outerRadius={outerRadius + 10}
                    fill={fill}
                />
                <text x={ex - (cos >= 0 ? 20 : -20) + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">Am-{`${value}`}</text>
                <text x={ex - (cos >= 0 ? 20 : -20) + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                    {`(${(percent * 100).toFixed(2)}%)`}
                </text>
            </g>
        );
    };
    return (

        <Page title="Dashboard">
            <div className="container p-2 ">
                <div className="flex flex-col sm:grid md:grid-cols-2 gap-2 items-center justify-center">
                    <div className="card bg-base-100 shadow-lg w-full  ">
                        <div className="card-body">
                            <h2 className="card-title divider text-sky-400">{t('dashboard.systemInformation')}</h2>
                            <div className="flex flex-col">
                                <div className="grid grid-cols-2">
                                    <div>
                                        <div className="text-lg font-bold">{t('dashboard.totalTransaction')}-{fPrice (cabinetInfo.totalTrx,'₮')}</div>
                                        <div className="">{t('dashboard.total')}-{fPrice (cabinetInfo.totalMe,'₮')}</div>
                                        <div className="">{t('dashboard.spent')}-{fPrice (cabinetInfo.spent,'₮')}</div>
                                        <div className="">{t('dashboard.received')}-{fPrice (cabinetInfo.received,'₮')}</div>
                                    </div>
                                    <div>
                                        <div className="text-lg font-bold">{t('dashboard.allProducts')}-{cabinetInfo.allProducts}</div>
                                        <div className=" ">{t('dashboard.empty')}-{cabinetInfo.inactive}</div>
                                        <div className=" ">{t('dashboard.filled')}-{cabinetInfo.available}({cabinetInfo.activeProductPercent})%</div>
                                    </div>
                                </div>
                                <div className="w-full h-[200px] relative">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart width={100} height={100}>
                                            <Pie
                                                activeIndex={activeIndex}
                                                activeShape={renderActiveShape}
                                                data={systemChartData}
                                                cx="50%"
                                                cy="50%"
                                                innerRadius={60}
                                                outerRadius={80}
                                                fill="#00d0ff"
                                                dataKey="value"
                                                onMouseEnter={onPieEnter}
                                            />

                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                        </div>
                    </div>
                    {/* Sent Information */}
                    <div className="card bg-base-100 shadow-lg w-full  ">
                        <div className="card-body">
                            <h2 className="card-title divider text-sky-400"><label><Icon height={20} width={20} icon="akar-icons:arrow-up" /></label>{t('dashboard.sentInformation')}</h2>
                            <div className="flex flex-col">

                                <div className="text-lg font-bold">{t('dashboard.amount')}-{fPrice(sentInfo.amount,'₮')}</div>

                            </div>
                            <div className="w-full h-[260px] relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart width={350} height={200}
                                        data={sentInfo.data}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="_id" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="total" stroke="#00d0ff" activeDot={{ r: 8 }} />

                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>
                    {/* Receive Information */}
                    <div className="card bg-base-100 shadow-lg w-full  ">
                        <div className="card-body">
                            <h2 className="card-title divider text-sky-400"><label><Icon height={20} width={20} icon="akar-icons:arrow-down" /></label>{t('dashboard.receiveInformation')}</h2>
                            <div className="flex flex-col">

                                <div className="text-lg font-bold">{t('dashboard.amount')}-{fPrice(receiveInfo.amount,'₮')}</div>

                            </div>
                            <div className="w-full h-[260px] relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart width={350} height={200}
                                        data={receiveInfo.data}
                                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}

                                    >
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="_id" />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <Line type="monotone" dataKey="total" stroke="#00d0ff" activeDot={{ r: 8 }} />

                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                    </div>
                    {/* Invoice Information */}
                    <div className="card bg-base-100 shadow-lg w-full  ">
                        <div className="card-body">
                            <h2 className="card-title divider text-sky-400"><label><Icon height={20} width={20} icon="la:file-invoice-dollar" /></label>{t('dashboard.invoiceHistory')}</h2>
                            <div className="flex flex-col w-full h-[295px] overflow-auto">
                                <div className="min-w-[550px]">
                                    {invoices.map((invoice, index) => {
                                        return (
                                            <div className="grid grid-cols-12 items-center border-0 border-b-[1px]" key={index}>

                                                <label>{index + 1}</label>
                                                <label className="col-span-4">{invoice.invoice}</label>
                                                <label className={`col-span-2 text-xs max-w-[70px] overflow-hidden text-ellipsis text-white badge ${invoice.isPaid ? "badge-info" : "badge-warning"}`}>{fPrice(invoice.cost,'₮')}</label>
                                                <label className="col-span-3 text-xs">{fShortDate(invoice.created)}</label>

                                                <button className="btn btn-xs btn-info btn-outline col-span-2" onClick={()=>{
                                                    setInvoiceID(invoice.realInvoice); setViewEbarimt(true);
                                                }}>Ebarimt</button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {viewEbarimt && <EbarimtInvoiceModal invoiceID = {invoiceID} onClose={()=>setViewEbarimt(false)} />}
        </Page >

    )
}