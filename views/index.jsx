const React = require('react')
const Default = require('./layouts/Default')

function Index ({breads, title}) {
  console.log("breadtest",breads)
    return (
      <Default title={title}>
        <h2>Index Page</h2>
         <div className="newButton">
           <a href="/breads/new"><button>Add a new bread</button></a>
         </div>
            {
                breads.map((bread, index)=> {
                
                   return (
                     <li key={bread.index}>
                      <a href={`/breads/${bread.id}`}>
                        {bread.name}
                      </a>
                    </li>
                    )
                })
            }
        </Default>
    )
}

module.exports = Index
