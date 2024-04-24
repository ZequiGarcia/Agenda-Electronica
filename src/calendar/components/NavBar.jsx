
export const NavBar = () => {
    return(
        <div className="navbar navbar-dark bg-dark b-4 px-4">
            <span className="navbar-brand">
                <i className="fa-solid fa-calendar-days"/>
                &nbsp;
                Wilmer
            </span>
            <button className="btn btn-outline-danger">
                <i className="fa-solid fa-right-from-bracket"></i>
                &nbsp;
                <span>salir</span>
            </button>
        </div>
    )
}