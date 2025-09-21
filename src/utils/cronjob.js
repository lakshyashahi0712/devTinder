// const { subDays, startOfDay, endOfDay } = require("date-fns");
// const cron = require("node-cron");
// const ConnectionRequestModel = require("../models/connectionRequest");
// const mailer = require("./mailer");

// // Manual test function - you can call this to test immediately
// // const cronjob = async () => {

// //    try {
// //       const targetDate = subDays(new Date(), 0); // Today
// //       const dayStart = startOfDay(targetDate);
// //       const dayEnd = endOfDay(targetDate);

// //       console.log("📅 Checking requests from:", dayStart.toLocaleString(), "to", dayEnd.toLocaleString());

// //       const pendingRequests = await ConnectionRequestModel.find({
// //          status: "interested",
// //          createdAt: {
// //             $gte: dayStart,
// //             $lt: dayEnd,
// //          }
// //       }).populate("fromUserId toUserId");

// //       console.log("📊 Found", pendingRequests.length, "pending requests");

// //       if (pendingRequests.length === 0) {
// //          console.log("✅ No pending requests found for today");
// //          return;
// //       }

// //       const listOfEmails = [...new Set(pendingRequests.map(req => req.toUserId.email))];
// //       console.log("📧 List of emails to notify:", listOfEmails);

// //       return listOfEmails;

// //    } catch (error) {
// //       console.error("❌ Test cron job failed:", error.message);
// //    }
// // };

// // Schedule cron job to run at 8 am every day
// cron.schedule("0 8 * * *", async () => {
//    console.log("🕙 Cron job started at:", new Date().toLocaleString());

//    try {
//       // Get today's date range (change to 1 for yesterday if needed)
//       const yesterday = subDays(new Date(),1); // 0 = today, 1 = yesterday
//       const yesterdayStart = startOfDay(yesterday);
//       const yesterdayEnd = endOfDay(yesterday);


//       const pendingRequests = await ConnectionRequestModel.find({
//          status: "interested",
//          createdAt: {
//             $gte: yesterdayStart,
//             $lt: yesterdayEnd,
//          }
//       }).populate("fromUserId toUserId");
//       const listOfEmails = [...new Set(pendingRequests.map(req => req.toUserId.email))];
//       console.log("📧 List of emails to notify:", listOfEmails);

   
//       for (const email of listOfEmails) {
//          try {
//             const res = await mailer.run(
//                "New friend request is pending",
//                "You have pending friend requests on DevTinder. Please log in to check them out!",
//                email
//             );
//             console.log("✅ Email sent successfully to:", email, "MessageID:", res.messageId);
//          } catch (err) {
//             console.error("❌ Failed to send email to:", email, "Error:", err.message);
//          }
//       }


//    } catch (error) {
//       console.error("❌ Cron job failed:", error.message);
//    }

//    console.log("🏁 Cron job completed at:", new Date().toLocaleString());
// }, );

// console.log("⏰ Cron job scheduled to run daily at 10:25 PM (Asia/Kolkata timezone)");
// console.log("🕙 Current server time:", new Date().toLocaleString());

// // Export the test function for manual testing
// // module.exports = { cronjob };