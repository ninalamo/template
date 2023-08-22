export default function Companies(){
    const companies = [
      {
        id: 1,
        name: "Cognizant",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      },
      {
        id: 2,
        name: "Cognizant",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      },
      {
        id: 3,
        name: "Cognizant",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      },
      {
        id: 4,
        name: "Cognizant",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      },
      {
        id: 5,
        name: "Cognizant",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      },
      {
        id: 6,
        name: "Cognizant",
        industry: "Outsourcing",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, inventore quisquam! Illo facilis nemo corporis aliquid perferendis obcaecati libero facere!"
      }
    ]


    return (
        <div>
          <h1>Companies</h1>
          <table className="table-fixed items-center bg-transparent w-full border-collapse">
            <thead>
              <tr>
                <th>Name</th>
                <th>Industry</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {companies && companies.map((company) => {
                 return <tr key={company.id}>
                  <td>{company.name}</td>
                  <td>{company.industry}</td>
                  <td>{company.description.slice(0,30)}...</td>
               </tr>
              })}
            </tbody>
          </table>
        </div>
      )
}