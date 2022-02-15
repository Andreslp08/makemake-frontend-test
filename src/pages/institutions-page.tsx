import React from "react";
import { useNavigate } from "react-router-dom";
import { BreadCrumbs, BreadCrumbsLink } from "../components/breadcrumbs";
import { SearchInput } from "../components/search-input";

export const InstitutionsPage: React.FC = () => {
    const navigate = useNavigate();

	return <div className="institutions-page">
        <BreadCrumbs>
            <BreadCrumbsLink  text="Institutos" onSelect={()=>navigate('/institutos')}/>
            <BreadCrumbsLink  text="Todos los institutos"/>
        </BreadCrumbs>
        <section className="info-grid">
            <h3 className="title divide-y divide-dashed hover:divide-solid">Tus institutos (Sedes)</h3>
            <h4 className="assigned">4/5 sedes asignadas</h4>
            <p className="filter-message">Filtra por instituto y podras ver los cursos asignados.</p>
            <p className="suscription-message">Su suscripción finaliza el <br/> --/--/--</p>
          <SearchInput placeholder="Busca aquí el nombre de tu sede" onValueChange={(value)=>console.log(value)}/>
        </section>
    </div>;
};
