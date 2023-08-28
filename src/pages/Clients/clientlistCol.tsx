import React from 'react';
import { Link } from 'react-router-dom';
import { size, map } from "lodash";

const Email = (cell: any) => {
    return cell.value ? cell.value : '';
};

const Mobile = (cell: any) => {
    return cell.value ? cell.value : '';
};

const Services = (cell: any) => {
    return (
        <>
            {map(cell.value, (service: any, index: any) => index < 2 && (
                <Link to="#" className="badge badge-soft-primary font-size-11 m-1" key={"_skill_" + cell.value + index}> {service} </Link>
            )
            )}
            {size(cell.value) > 2 && (
                <Link to="#" className="badge badge-soft-primary font-size-11 m-1" key={"_skill_" + cell.value} > {size(cell.value) - 1} + more  </Link>
            )}
        </>
    );
};

const Projects = (cell: any) => {
    return cell.value ? cell.value : '';
};

const Img = (cell: any) => {
    return (
        <>
            {!cell.value ? (
                <div className="avatar-xs">
                    <span className="avatar-title rounded-circle">
                        {cell.data[0].name.charAt(0)}
                    </span>
                </div>
            ) : (
                <div>
                    <img className="rounded-circle avatar-xs" src={cell.value} alt="" />
                </div>
            )}
        </>
    );
};

export { Email, Services, Projects, Img, Mobile };