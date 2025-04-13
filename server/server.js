const express = require("express");
const axios = require("axios");
const xml2js = require("xml2js");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const API_URL = "https://api.twenty7tec.com/sourcing.svc?wsdl";
const LICENSE_KEY = "881918bf-c118-48f3-982d-6678fa4cf37d";
const COMPANY_ID = "VLYZVW";
const SITE_ID = "BTMIKK";
const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzta_Y74BF7knB-PW5tH7I4euZgyyr6cEByCeTzVXeKWqHchSM93YpshJpB6gBk5LDRyw/exec";

/**
 * ✅ Mortgage API Route (No changes made)
 */
// ⚠️ In this code, you removed some parts of the code — I don't know why, but I  added them back ⚠️

// const generateSoapRequestBody = (mortgageType, params) => {
//   let MortgageClass = "";
//   let LimitedCompanyDetails = "";
//   let paymentMethodDetails = "";
//   let filters = "";

//   if (mortgageType === "Standard" || mortgageType === "Buy_To_Let") {
//     const rateTypeMapping = {
//       Fixed: `
//         <tem:MortgageClass>
//           <tem:Fixed>No_Filter</tem:Fixed>
//           <tem:Variable>Ignore</tem:Variable>
//           <tem:Capped>Ignore</tem:Capped>
//           <tem:LiborLinked>Ignore</tem:LiborLinked>
//           <tem:Discount>Ignore</tem:Discount>
//           <tem:Tracker>Ignore</tem:Tracker>
//         </tem:MortgageClass>`,
//       Variable: `
//         <tem:MortgageClass>
//           <tem:Fixed>Ignore</tem:Fixed>
//           <tem:Variable>No_Filter</tem:Variable>
//           <tem:Capped>Ignore</tem:Capped>
//           <tem:LiborLinked>Ignore</tem:LiborLinked>
//           <tem:Discount>Ignore</tem:Discount>
//           <tem:Tracker>Ignore</tem:Tracker>
//         </tem:MortgageClass>`,
//     };

//     MortgageClass = rateTypeMapping[params.rateType] || "";

//     if (params.LimitedCompany || params.LimitedCompanySPV) {
//       LimitedCompanyDetails = `
//         <tem:BuyToLetDetails>
//           ${params.LimitedCompany ? `<tem:LimitedCompany>${params.LimitedCompany}</tem:LimitedCompany>` : ""}
//           ${params.LimitedCompanySPV ? `<tem:LimitedCompanySPV>${params.LimitedCompanySPV}</tem:LimitedCompanySPV>` : ""}
//         </tem:BuyToLetDetails>`.trim();
//     }

//     if (params.paymentMethod) {
//       paymentMethodDetails = `
//         <tem:SecuredLoanDetails>
//           <tem:BridgingDetails>
//             <tem:BridgingPaymentMethod>${params.paymentMethod}</tem:BridgingPaymentMethod>
//           </tem:BridgingDetails>
//         </tem:SecuredLoanDetails>`;
//     }
//   }

//   if (params.epcImprovements) {
//     filters = `<tem:GreenEcoProduct>Include</tem:GreenEcoProduct>`;
//   }

//   return `
//   <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
//      <soapenv:Header/>
//      <soapenv:Body>
//         <tem:RunSource>
//            <tem:licenseKey>${LICENSE_KEY}</tem:licenseKey>
//            <tem:input>
//               <tem:CompanyId>${COMPANY_ID}</tem:CompanyId>
//               <tem:SiteId>${SITE_ID}</tem:SiteId>
//               <tem:ExpectedValuation>${params.expectedValuation || 0}</tem:ExpectedValuation>
//               <tem:LoanRequired>${params.loanRequired || 0}</tem:LoanRequired>
//               <tem:ReasonForMortgage>${params.loanType || "Purchase"}</tem:ReasonForMortgage>
//               <tem:MortgageType>${mortgageType}</tem:MortgageType>
//               <tem:Term>${params.termMonths || 0}</tem:Term>
//               <tem:TermUnit>${params.termUnit || "Years"}</tem:TermUnit>
//               ${MortgageClass}
//               <tem:Filters>${filters}</tem:Filters>
//               ${paymentMethodDetails}
//               ${LimitedCompanyDetails}
//            </tem:input>
//         </tem:RunSource>
//      </soapenv:Body>
//   </soapenv:Envelope>`;
// };

//this was the original code, but I added the missing parts back in ^^

const generateSoapRequestBody = (mortgageType, params) => {
  let productTermPeriodFromMonths = "";
  let productTermPeriodToMonths = "";
  let GreenEcoProduct = "";
  let brigingPaymentMethod = "";
  let buyToLetPaymentMethod = ""
  let MortgageClass = "";
  let LimitedCompanySPV = "";
  let LimitedCompany = "";
  let Ownership = "";

  if(mortgageType==="Standard"||mortgageType==="Buy_To_Let"){
  const rateTypeMapping = {
    Fixed: `
      <tem:MortgageClass>
        <tem:Fixed>No_Filter</tem:Fixed>
        <tem:Variable>Ignore</tem:Variable>
        <tem:Capped>Ignore</tem:Capped>
        <tem:LiborLinked>Ignore</tem:LiborLinked>
        <tem:Discount>Ignore</tem:Discount>
        <tem:Tracker>Ignore</tem:Tracker>
      </tem:MortgageClass>`,
    Variable: `
      <tem:MortgageClass>
        <tem:Fixed>Ignore</tem:Fixed>
        <tem:Variable>No_Filter</tem:Variable>
        <tem:Capped>Ignore</tem:Capped>
        <tem:LiborLinked>Ignore</tem:LiborLinked>
        <tem:Discount>Ignore</tem:Discount>
        <tem:Tracker>Ignore</tem:Tracker>
      </tem:MortgageClass>`
  };
  
  MortgageClass = rateTypeMapping[params.rateType] || "";


  if (params.LimitedCompany || params.LimitedCompanySPV) {
    LimitedCompany = `<tem:BuyToLetDetails>
                        ${params.LimitedCompany ? `<tem:LimitedCompany>${params.LimitedCompany}</tem:LimitedCompany>` : ""}
                        ${params.LimitedCompanySPV ? `<tem:LimitedCompanySPV>${params.LimitedCompanySPV}</tem:LimitedCompanySPV>` : ""}
                      </tem:BuyToLetDetails>`.trim();
  }



  if (params.paymentMethod) {
    brigingPaymentMethod = `<tem:SecuredLoanDetails>
       <tem:BridgingDetails>
        <tem:BridgingPaymentMethod>${params.paymentMethod}</tem:BridgingPaymentMethod>
        </tem:BridgingDetails>
        </tem:SecuredLoanDetails>`
  }
  if (params.buyToLetPaymentMethod) {
    buyToLetPaymentMethod = `
      <tem:PaymentMethod>${params.buyToLetPaymentMethod}</tem:PaymentMethod>
     `
  }
  switch (params.epcImprovements) {
    case true:
      GreenEcoProduct = "<tem:GreenEcoProduct>Include</tem:GreenEcoProduct>";
      break;
    default:
      GreenEcoProduct = '';
  }
  switch (params.productPeriod) {
    case "All":
      productTermPeriodFromMonths = '';
      productTermPeriodToMonths = '';
      break;
    case "5+ years":
      productTermPeriodFromMonths = "<tem:ProductTermPeriodFromMonths>60</tem:ProductTermPeriodFromMonths>";
      productTermPeriodToMonths = "<tem:ProductTermPeriodToMonths>75</tem:ProductTermPeriodToMonths>";
      break;
    case "2 years":
      productTermPeriodFromMonths = "<tem:ProductTermPeriodFromMonths>24</tem:ProductTermPeriodFromMonths>";
      productTermPeriodToMonths = "<tem:ProductTermPeriodToMonths>24</tem:ProductTermPeriodToMonths>";
      break;
    case "3 years":
      productTermPeriodFromMonths = "<tem:ProductTermPeriodFromMonths>36</tem:ProductTermPeriodFromMonths>";
      productTermPeriodToMonths = "<tem:ProductTermPeriodToMonths>36</tem:ProductTermPeriodToMonths>";
      break;
    case "4 years":
      productTermPeriodFromMonths = "<tem:ProductTermPeriodFromMonths>48</tem:ProductTermPeriodFromMonths>";
      productTermPeriodToMonths = "<tem:ProductTermPeriodToMonths>75</tem:ProductTermPeriodToMonths>";
      break;
    case "5 years":
      productTermPeriodFromMonths = "<tem:ProductTermPeriodFromMonths>60</tem:ProductTermPeriodFromMonths>";
      productTermPeriodToMonths = "<tem:ProductTermPeriodToMonths>60</tem:ProductTermPeriodToMonths>";
      break;
    case "Custom":
      productTermPeriodFromMonths = `<tem:ProductTermPeriodFromMonths>${params.customFrom}</tem:ProductTermPeriodFromMonths>`;
      productTermPeriodToMonths = `<tem:ProductTermPeriodToMonths>${params.customTo}</tem:ProductTermPeriodToMonths>`;
      break;  
    default:
      productTermPeriodFromMonths = '';
      productTermPeriodToMonths = '';
  }
}
  return `
  <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tem="http://tempuri.org/">
     <soapenv:Header/>
     <soapenv:Body>
        <tem:RunSource>
           <tem:licenseKey>${LICENSE_KEY}</tem:licenseKey>
           <tem:input>
              <tem:CompanyId>${COMPANY_ID}</tem:CompanyId>
              <tem:SiteId>${SITE_ID}</tem:SiteId>
              <tem:ExpectedValuation>${params.expectedValuation || 0}</tem:ExpectedValuation>
              <tem:LoanRequired>${params.loanRequired || 0}</tem:LoanRequired>
              <tem:ReasonForMortgage>${params.loanTypex || "Purchase"}</tem:ReasonForMortgage>
              <tem:MortgageType>${mortgageType}</tem:MortgageType>
              <tem:Term>${params.termMonths || 0}</tem:Term>
              <tem:TermUnit>${params.termUnit || "Years"}</tem:TermUnit>
              ${MortgageClass}
            
               <tem:Filters>
                ${productTermPeriodFromMonths}
                ${productTermPeriodToMonths}
                ${GreenEcoProduct}

            </tem:Filters>
            ${brigingPaymentMethod}
            ${buyToLetPaymentMethod}
            ${LimitedCompany}
            ${LimitedCompanySPV}

           </tem:input>
        </tem:RunSource>
     </soapenv:Body>
  </soapenv:Envelope>
    `;
};


app.post("/api/mortgage", async (req, res) => {
  try {
    const { mortgageType, params } = req.body;
    const requestBody = generateSoapRequestBody(mortgageType, params);

    console.log("SOAP Request Sent:", requestBody);

    const response = await axios.post(API_URL, requestBody, {
      headers: {
        "Content-Type": "text/xml;charset=UTF-8",
        "SOAPAction": "http://tempuri.org/ISourcing/RunSource"
      }
    });

    const parsedData = await parseXmlResponse(response.data);
    res.json(parsedData);
  } catch (error) {
    console.error("❌ Mortgage API Error:", error);
    res.status(500).json({ error: "Failed to fetch mortgage data" });
  }
});

/**
 * ✅ Fixed Rate Reminder API
 */
app.post("/submit-fixed-rate-reminder", async (req, res) => {
  try {
    await axios.post(GOOGLE_SCRIPT_URL, { type: "FixedRateReminder", ...req.body });
    res.json({ message: "✅ Fixed Rate Reminder submitted successfully!" });
  } catch (error) {
    console.error("❌ Fixed Rate Reminder Submission Error:", error.message);
    res.status(500).json({ error: "❌ Failed to submit Fixed Rate Reminder." });
  }
});

/**
 * ✅ Newsletter Subscription API
 */
app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    await axios.post(GOOGLE_SCRIPT_URL, { type: "newsletter", email });

    res.json({ message: "✅ Successfully subscribed!" });
  } catch (error) {
    console.error("❌ Newsletter Subscription Error:", error);
    res.status(500).json({ error: "❌ Failed to subscribe." });
  }
});

/**
 * ✅ Loan Application API
 */
app.post("/submit-loan-application", async (req, res) => {
  try {
    await axios.post(GOOGLE_SCRIPT_URL, { type: "loan_application", ...req.body });

    res.json({ message: "✅ Loan application submitted successfully!" });
  } catch (error) {
    console.error("❌ Loan Application Error:", error.message);
    res.status(500).json({ error: "❌ Failed to submit loan application." });
  }
});

/**
 * ✅ XML Parsing Helper Function
 */
const parseXmlResponse = (xmlData) => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xmlData, { explicitArray: false }, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
};

/**
 * ✅ Serve static files from React app (Fixed Path)
 */
app.use(express.static("build"));

app.get("*", (req, res) => {
  res.sendFile(__dirname + "/build/index.html");
});

/**
 * ✅ Start the server
 */
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});