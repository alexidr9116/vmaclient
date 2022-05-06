import Page from '../../component/Page'

export default function GetProducts() {
    return (
        <Page title={'Products'}>
            <div className='flex flex-col gap-2 px-4'>
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src="https://api.lorem.space/image/movie?w=200&h=280" alt="Movie"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-info btn-sm">Buy</button>
                        </div>
                    </div>
                </div>
                <div className="card card-side bg-base-100 shadow-xl">
                    <figure><img src="https://api.lorem.space/image/movie?w=200&h=280" alt="Movie"/></figure>
                    <div className="card-body">
                        <h2 className="card-title">New movie is released!</h2>
                        <p>Click the button to watch on Jetflix app.</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-info btn-sm">Buy</button>
                        </div>
                    </div>
                </div>
            </div>
        </Page>
    )
}