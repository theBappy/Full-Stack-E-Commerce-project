const addProductReview = async (req, res) => {
    try {
      const { rating, comment } = req.body;
      const product = await Product.findById(req.params.productId);
  
      const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment,
      };
  
      product.reviews.push(review);
      product.averageRating = 
        product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
  
      await product.save();
      res.status(201).json({ success: true, reviews: product.reviews });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
};
  