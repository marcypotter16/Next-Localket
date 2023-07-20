export default function MercatiniId({params}: { params: { id: string } }) {
    const id = params?.id
    return (
        <div>
            <h1>MercatiniId</h1>
            {id && <p>Id: {id}</p>}
        </div>
    )
}