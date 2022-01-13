const Table = (props) => {
    console.log(props)
    return(
        <div>
        {props.dataNotLoaded 
            ? <div class="d-flex justify-content-center">
                <div class="spinner-border" role="status" style={{width: "3rem", height: "3rem"}}>
                    <span class="sr-only" aria-hidden="true"></span>
                </div>
             </div> 
            : 
            <div class="container" style={{display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gridGap: "0.5em", paddingTop: "50px"}}> 

            {props.data.map(index => {
                return (
                    <div class="card" key={index.link} style={{textAlign: "center"}}>
                        <div class="card-image">
                            <figure class="image">
                                <img src={index.image} alt={index.title}/>
                            </figure>
                        </div>
                        <div class="card-content">
                            
                            <p class="subtitle" style={{color: "#B4841E"}}>{index.date}</p>
                            <p class="title" style={{fontSize: "1.5em"}}>{index.title}</p>
                            <div class="content" style={{fontSize: "0.80em"}}>{index.director}</div>
                            <p class="subtitle" style={{margin: "auto", color: "#00CC00"}}>{index.price}</p>
                        </div>

                        <div style={{margin: "auto"}}></div>
                        <button type="button" 
                                class="btn btn-outline-success btn-lg btn-block" 
                                onClick={() => window.open(index.link, "_blank")}>
                                Buy
                        </button>
                    </div>
                )
            })}
            </div>
        }
        </div>
    )
}

export default Table;