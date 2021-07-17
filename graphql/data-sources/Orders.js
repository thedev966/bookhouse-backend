const { MongoDataSource } = require("apollo-datasource-mongodb");
const Order = require("../../models/Order");

class Orders extends MongoDataSource {
  async fetchAllOrders({ userID }) {
    try {
      const orders = await Order.find({ buyerID: userID });
      return {
        success: true,
        orders: orders,
      };
    } catch (err) {
      console.log(err);
      return {
        success: false,
        orders: [],
      };
    }
  }

  async paypalCheckout({ userID, order }) {
    console.log(order);
    try {
      const parsedOrder = JSON.parse(order);
      if (parsedOrder.status === "COMPLETED") {
        const items = [];
        let total = 0;
        parsedOrder.purchase_units.forEach((p) => {
          items.push({ title: p.description, quantity: 1 });
          total += parseFloat(p.amount.value);
        });
        console.log(items);
        console.log(total);

        // store it in the db
        await Order.create({
          orderID: parsedOrder.id,
          buyerID: userID,
          method: "Paypal",
          items: items,
          total: `$${total.toFixed(2)}`,
          status: "paid",
        });
        return { success: true, message: "Payment was completed!" };
      } else {
        return { success: false, message: "Payment was unsuccesfull!" };
      }
    } catch (err) {
      console.log(err);
      return { success: false, message: "Error" };
    }
  }
}

module.exports = Orders;
