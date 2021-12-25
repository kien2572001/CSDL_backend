let getHomePage = (req,res)=>{
    return res.render('homepage',{})
}
module.exports = {
    getHomePage: getHomePage
}