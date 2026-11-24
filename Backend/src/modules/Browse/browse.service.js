async function browse_service({filters , pagination}){
    const querKeys  = Object.keys(filters) ;
    const queryValues  = Object.values(filters)
    queryValues.push(pagination.cursor); 
    querKeys.push("cursor") ;
    let whereClause = Object.entries(filters).map((entire , index ) =>{
        return `${entire[0]} = $${index + 1}`
    }).join(" AND ") ;
    let limitClause = `LIMIT $${queryValues.length + 1}` ;
    queryValues.push(pagination.limit) ;
}
export default browse_service ;