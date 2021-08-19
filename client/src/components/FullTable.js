const FullTable = (props) => {
    return(
        <table class="table is-hoverable has-text-centered" className="content-table">
            <thead style={{lineHeight: "100px", borderBottom: "3px solid black"}}>
                <tr style={{fontFamily: "Mercury Display A", fontSize: "16px", whiteSpace: "nowrap"}} class="has-text-centered">
                    <td>Spine #</td>
                    <td></td>
                    <td>Title</td>
                    <td>Director</td>
                    <td>Country</td>
                    <td>Year</td>
                    <td>Price</td>
                </tr>
            </thead>

            <tbody>
                {props.data.map(index => {
                    return(
                        <tr key={index.link} style={{fontFamily: "Gotham B"}} class="has-text-centered" onClick={() => window.open(index.link, "_blank")}>
                            <td>{index.spineNumber}</td>
                            <td>
                                <img style={{width: "40%", height: "auto"}} src={index.image} alt={index.title}/>
                            </td>
                            <td style={{fontWeight: "700",}}>{index.title}</td>
                            <td>{index.director}</td>
                            <td>{index.country}</td>
                            <td>{index.year}</td>
                            <td style={{ color: index.price.substring(0, 1) !== '$' ? "#ff0000" : "#00CC00" }}>{index.price}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default FullTable;