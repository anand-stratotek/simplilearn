const { request } = require('express');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const PurchasedCourse = require('../../models/PurchasedCourse');
const stripe = require('stripe')('sk_test_tR3PYbcVNZZ796tH88S4VQ2u');
const app = express();
app.use(express.json());

//@route  get api/payment
//@desc   checkout payment
//@access Private

router.post('/purchase-course', async (req, res) => {
  const { id, email } = req.body;
  // console.log('ID=>', id);
  // console.log('email=>', email);
  try {
    //See if user exists
    const newPurchasedCourse = new PurchasedCourse({
      user: email,
      courseId: id,
    });
    const course = await newPurchasedCourse.save();
    res.json(course);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});
router.post('/purchased-courses', async (req, res) => {
  const { email } = req.body;
  // console.log('ID=>', id);
  // console.log('email=>', email);
  try {
    //See if user exists
    const courses = await PurchasedCourse.find({ user: email }).sort({
      date: -1,
    });

    res.json(courses);
  } catch (error) {
    console.log(error.message);
    res.status(500).send('Server Error');
  }
});

// router.post('/create-payment-intent', async (req, res) => {
//   console.log('REQUEST=>', req);
//   const { price } = req.body;
//   // const price = req.price;
//   // console.log('PRICE=>', price);

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: price,
//     currency: 'inr',
//     // mode: 'payment',
//     // quantity: 1,
//   });
//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

module.exports = router;
