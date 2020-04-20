import React from "react";
import {Button} from "antd";

export default ({columns, data, selections, setSelections, handleClick}) => {

    const selectionsCount = Object.values(selections).length;

    const allSelected = () => {
        let tempSelections = {};
        const count = data.filter(item => selections.hasOwnProperty(item.dataKey)).length;

        if (count === data.length) {
            let keys = data.map(item => item.dataKey);
            Object.keys(selections).map(key => {
                if (keys.find(dataKey => parseInt(dataKey) === parseInt(key)) === undefined) {
                    tempSelections = {
                        ...tempSelections,
                        [key]: selections[key]
                    }
                }
            })

            setSelections(tempSelections);


        } else {
            data.map(item => tempSelections = ({
                ...tempSelections,
                ...selections,
                [item.dataKey]: item
            }))

            setSelections(tempSelections);
        }

    }

    const selectedPrev = () => {
        if (data.length > 0) {
            return data.every(item => selections.hasOwnProperty(item.dataKey) === false)

        }

        return false;
    }


    const length = () => {
        return data.filter(item => selections.hasOwnProperty(item.dataKey)).length === data.length
    }


    return (
        <div className={"ant-table-content"} style={{overflowX: 'scroll'}}>

            <div>
                <Button onClick={handleClick} type={"primary"} disabled={selectionsCount === 0}>
                    Отправить
                </Button>

                {`${selectionsCount !== 0 ? ' Выбрано: ' + selectionsCount : ''}`}
            </div>

            <table style={{width: '100%'}}>
                <thead className={"ant-table-thead"}>
                <tr>
                    <th className="ant-table-cell ant-table-selection-column">
                        <div className="ant-table-selection">
                            <label
                                onClick={() => allSelected()}
                                className="ant-checkbox-wrapper ant-checkbox-wrapper-checked"><span
                                className={`ant-checkbox ${(false === selectedPrev() && Object.values(selections).length > 0) ? (length()) ? 'ant-checkbox-checked' : 'ant-checkbox-indeterminate' : ''}`}>
                            <input type="checkbox"
                                   className="ant-checkbox-input"
                                   value=""/>
                                <span
                                    className="ant-checkbox-inner">

                            </span></span></label></div>
                    </th>
                    {columns.map((item, idx) => {
                        return (
                            <th key={idx}>{item.title}</th>
                        )
                    })}
                </tr>
                </thead>
                <tbody className={"ant-table-tbody"}>
                {data.map((item, idx) => {
                    return (
                        <tr key={idx}>
                            <td>
                                <div className="ant-table-selection">
                                    <label
                                        onClick={() => setSelections({
                                            ...selections,
                                            [item.dataKey]: item
                                        })}
                                        className="ant-checkbox-wrapper ant-checkbox-wrapper-checked">
                                    <span
                                        className={`ant-checkbox ${selections?.hasOwnProperty(item.dataKey) ? 'ant-checkbox-checked' : ''}`}>
                                        <input type="checkbox"
                                               className="ant-checkbox-input"
                                               value=""
                                        />
                                            <span
                                                className="ant-checkbox-inner">
                                            </span>
                                    </span>
                                    </label>
                                </div>
                            </td>
                            <td>{item.dataKey}</td>
                            <td>{item.first_name}</td>
                            <td>{item.second_name}</td>
                            <td>{item.third_name}</td>
                            <td>{item.department}</td>
                            <td>{item.position}</td>
                            <td>{item.guid}</td>
                            <td>{item.exists}</td>
                            <td>{item.has_changes}</td>
                            <td>{item.email}</td>
                            <td>{item.ldap_login}</td>
                            <td>{item.ldap_profile_id}</td>
                            <td>{item.marks}</td>
                            <td>{item.ldap_external_id}</td>
                        </tr>
                    )
                })}
                </tbody>

            </table>
        </div>
    )
}

function first(obj) {
    for (var a in obj) return a;
}