const Table = (props) => {
    console.log(props)
    return(
        <table class="table is-hoverable has-text-centered" className="content-table" style={{ paddingTop: "50px"}}>
            <thead style={{lineHeight: "100px", borderBottom: "3px solid black"}}>
                <tr style={{fontFamily: "Mercury Display A", fontSize: "16px", whiteSpace: "nowrap"}} class="has-text-centered">
                    <td></td>
                    <td>Title</td>
                    <td>Director</td>
                    <td>Price</td>
                    <td>Date</td>
                </tr>
            </thead>

            <tbody>
                {props.data.map(index => {
                    return(
                        <tr key={index.link} style={{fontFamily: "Gotham B"}} class="has-text-centered" onClick={() => window.open(index.link, "_blank")}>
                            <td>
                                <img style={{width: "40%", height: "auto"}} src={index.image} alt={index.title}/>
                            </td>
                            <td style={{fontWeight: "700",}}>{index.title}</td>
                            <td style={{textWrap: "normal", wordWrap: "break-word"}}>{index.director}</td>
                            <td style={{color: '#00CC00'}}>{index.price}</td>
                            <td>{index.date}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default Table;