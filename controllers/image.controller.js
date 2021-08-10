class imageController {
  postImage(req, res) {
    const { image } = req.body;
    res.json("You added img");
  }
  getPersonImages(req, res) {
    const { id } = req.params.id;
    res.json(`Images of ${id} person:`);
  }
}
module.exports = new imageController();
