import axios from "axios"

export const requestPayment = async (req, res)=> {
  try {
    const { telephoneNumber, amount, description } = req.body;
    const organizationId = "7577d6a4-b5a0-44f7-ab73-85cc5ea6515e";
    
    const paymentRequestResponse = await axios.post('https://opay-api.oltranz.com/opay/paymentrequest', {
      telephoneNumber,
      amount,
      description,
      organizationId,
    });
    
    console.log(paymentRequestResponse.data); 
    
    res.status(paymentRequestResponse.status).json(paymentRequestResponse.data);
  } catch (error) {
    const { status, data } = error.response;
    const message = status === 401 && data.code === "401" && data.description === "TE PAYER DOES NOT HAVE SUFFICIENT FUNDS ON HIS/HER ACCOUNT"
      ? "You have low amount of money on your account"
      : "Payment request failed";
    
    res.status(status).json({ message });
  }
}
