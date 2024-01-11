import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <section className=" gradient-custom-2">
      <div className="container">
   

            <div className="card mask-custom">
              <div className="card-body p-4 text-white">


                <table className="table text-white mb-0">
                  <thead>
                    <tr>
                      <th scope="col">Week No.</th>
                      <th scope="col">feedback</th>
                      <th scope="col">Understanding</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tasks.map((task, index) => (
                      <tr className="fw-normal" key={index}>
                        <th>
                          <img src={task.avatar} alt={`avatar ${index}`} style={{ width: '45px', height: 'auto' }} />
                          <span className="ms-2">{task.assignee}</span>
                        </th>
                        <td className="align-middle">{task.taskName}</td>
                        <td className="align-middle">
                          <h6 className="mb-0"><span className={`badge ${task.priorityClass}`}>{task.priority}</span></h6>
                        </td>
                        <td className="align-middle">
                          <a href="#!" data-mdb-toggle="tooltip" title="Done"><i className="fas fa-check fa-lg text-success me-3"></i></a>

                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              </div>
         
        </div>
      </div>
    </section>
  );
};

export default TaskList;
