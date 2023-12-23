import React, {useState} from 'react';

const Problem1 = () => {

    const [show, setShow] = useState('all');
    const [data,setData] = useState([]);

    const handleSubmit = e =>{
        e.preventDefault();
        const form =e.target.elements;
        const name = form.name.value;
        const status = form.status.value.toLowerCase();
        
        
        console.log( name,status)
        // name with status store into a state
        setData([...data,{name,status}]);
        console.log(data)
    }
    

    const handleClick = (val) =>{
        setShow(val);
    }

    const sortedData = [...data].sort((a, b) => {
        const order = ['active', 'completed'];
    
        const orderA = order.indexOf(a.status);
        const orderB = order.indexOf(b.status);
    
        if (orderA !== -1 && orderB !== -1) {
            return orderA - orderB;
        }
    
        return orderA !== -1 ? -1 : orderB !== -1 ? 1 : 0;
    });
    
   
    const filteredData =
    show === 'all'
        ? sortedData
        : sortedData.filter((item) => item.status === show);

    return (

        <div className="container">
            <div className="row justify-content-center mt-5">
                <h4 className='text-center text-uppercase mb-5'>Problem-1</h4>
                <div className="col-6 ">
                <form onSubmit={handleSubmit} className="row gy-2 gx-3 align-items-center mb-4">
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Name" name="name" />
                        </div>
                        <div className="col-auto">
                            <input type="text" className="form-control" placeholder="Status" name="status" />
                        </div>
                        <div className="col-auto">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <div className="col-8">
                    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='all' && 'active'}`} type="button" onClick={()=>handleClick('all')}>All</button>
                        </li>
                        <li className="nav-item">
                            <button className={`nav-link ${show==='active' && 'active'}`} type="button" onClick={()=>handleClick('active')}>Active</button>
                        </li>
                        <li className="nav-item">
                            <button  className={`nav-link ${show==='completed' && 'active'}`} type="button" onClick={()=>handleClick('completed')}>Completed</button>
                        </li>
                    </ul>
                    <div className="tab-content"></div>
                    <table className="table table-striped ">
                        <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredData.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problem1;