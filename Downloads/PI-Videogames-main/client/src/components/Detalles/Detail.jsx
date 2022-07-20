import { connect } from "react-redux";
import "./detalleStyle.css"
import logo from "../../img/logo.jpg";
import { clear, getDetail } from "../../actions";
import { useEffect } from "react"
 
function mapStateToProps(state) {
    return {
        gamesDetail: state.gameDetail
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getDetail: id => dispatch(getDetail(id)),
        clear: () => dispatch(clear())
    };
}

function Detail(props) {
    const { name, description, generos, rating, plataformas, img, data_added, id } = props.gamesDetail
    
        useEffect(()=>{
            props.clear()
            props.getDetail(props.match.params.id)}, [])
            
    return (
        <>
            {
                <div className="contein">
                    <div className="conteinDetail">
                        <div className="nombre" >
                            {name}
                        </div>
                        <img src={`${img || logo}`} className="imgDetail" alt="img"/>
                        <div className="conteinDos">
                            <div className="info">
                                Rating: <br /><br /> {rating}
                            </div>
                            <div className="info">
                                Plataforms: <br /><br /> {plataformas ? typeof plataformas === 'object' ? plataformas.join(", ") : plataformas : null}
                            </div>
                            <div className="info">
                                Genders: <br /><br /> {generos ? generos.join(", ") : null}
                            </div>
                            <div className="info">
                                Release Date: <br /><br /> {data_added}
                            </div>
                        </div>
                        <div dangerouslySetInnerHTML={{ __html: "Description: " + description }} className="description" />
                    </div>
                </div>
            }
        </>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)
