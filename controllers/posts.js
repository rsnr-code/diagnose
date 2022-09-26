

module.exports = {
    getFeed: async (req, res) => {
        try {
          
          res.render("feed");
        } catch (err) {
          console.log(err);
        }
}
}