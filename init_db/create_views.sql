-- Get items sold by each seller
CREATE VIEW vw_SellerInventoryHistory AS
SELECT PS.Product_ID, PS.Seller_ID,PS.Price,P.Name, P.Category, P.Description, PS.Stock
FROM Product AS P, Product_Stock AS PS
WHERE P.Product_ID = PS.Product_ID;

-- Get a list of customers who had rejected transactions
CREATE VIEW vw_CustomersWithRejectedTransactions AS
SELECT C.Cust_id, C.Username, COUNT(*) AS Rejected_Transactions
FROM Customer as C, Transactions as T
WHERE T.Bank_ID = C.Bank_ID
    AND T.Account_id = C.Bank_AccNum
    AND T.Approval_Status = 'Rejected'
GROUP BY C.Cust_id;

-- Get a list of customers who had approved transactions
CREATE VIEW vw_CustomersWithApprovedTransactions AS
SELECT C.Cust_id, U.Name, U.Email, U.Phone_no, COUNT(*) AS Count
FROM Customer as C, Transactions as T, Users as U
WHERE T.Bank_ID = C.Bank_ID
    AND T.Account_id = C.Bank_AccNum
    AND T.Approval_Status = 'Approved'
    AND U.ID = C.Cust_id
GROUP BY C.Cust_id;

-- Get a list of customers who had pending transactions
CREATE VIEW vw_CustomersWithPendingTransactions AS
SELECT C.Cust_id, U.Name, U.Email, U.Phone_no, COUNT(*) AS Count
FROM Customer as C, Transactions as T, Users as U
WHERE T.Bank_ID = C.Bank_ID
    AND T.Account_id = C.Bank_AccNum
    AND T.Approval_Status = 'Pending'
    AND U.ID = C.Cust_id
GROUP BY C.Cust_id;

-- Get a list of products that are out of stock
CREATE VIEW vw_OutOfStockProducts AS
SELECT Product_ID, Name, Category, Description
FROM Product NATURAL JOIN Product_Stock
WHERE Stock = 0;

-- Get a list of customers' names, emails and main mailing addresses
CREATE VIEW vw_CustomerNamesEmailsAddresses AS
SELECT Name, Email, Address1
FROM Users NATURAL JOIN Addresses JOIN Customer ON ID = Cust_id;

-- Get a list of top 3 most frequent banks that transactions are involved in
CREATE VIEW vw_Top3BankTransactions AS
SELECT B.Bank_id, B.Name, COUNT(*) AS Total_Transactions
FROM Bank AS B JOIN Transactions as T ON B.Bank_id = T.Bank_ID
GROUP BY B.Bank_id
ORDER BY Total_Transactions DESC
LIMIT 3;

-- Get a list of sellers and their most frequent customer
CREATE VIEW vw_SellersMostFrequentCustomer AS
SELECT S.Seller_ID, S.Username, MAX(C.Username) AS Most_Frequent_Customer
FROM Orders AS O, Order_Summary AS OS, Customer AS C, Sellers AS S
WHERE O.Order_ID = OS.Order_ID
    AND O.Cust_ID = C.Cust_id
    AND OS.Seller_ID = S.Seller_ID
GROUP BY S.Seller_ID, S.Username;

-- Get a list of top 5 most frequently purchased products with completed orders
CREATE VIEW vw_Top5PurchasedProductsCompletedOrders AS
SELECT P.Product_ID, P.Name, P.Category, P.Description, COUNT(*) AS Amount_Purchased
FROM Product AS P, Order_Summary AS OS, Orders AS O
WHERE P.Product_ID = OS.Product_ID
    AND O.Order_ID = OS.Order_ID
    AND O.Status = 'Completed'
GROUP BY P.Product_ID
ORDER BY Amount_Purchased DESC
LIMIT 5;

-- Get a view of Customer orders
CREATE VIEW vw_CustomerOrderHistory AS
SELECT C.Cust_id, C.Username, P.Name, OS.Count, PS.Price
FROM Customer AS C, Product AS P, Orders AS O, Order_Summary AS OS, Product_Stock AS PS
WHERE C.Cust_id = O.Cust_ID
    AND P.Product_ID = OS.Product_ID
    AND O.Order_ID = OS.Order_ID
    AND PS.Product_ID = P.Product_ID;

-- Get a list of top 5 customers who spend the most money
CREATE VIEW vw_Top5CustomerSpenders AS
SELECT Cust_id, Username, SUM(Count * Price) AS Total_Money_Spent
FROM vw_CustomerOrderHistory
GROUP BY Cust_id, Username
ORDER BY Total_Money_Spent DESC
LIMIT 5;

-- Returns how much each customer has spent
CREATE VIEW CustomerSpent AS
SELECT C.Cust_id, C.Username, SUM(OS.Count * PS.Price) AS Spent  
FROM Customer AS C, Product AS P, Orders AS O, Order_Summary AS OS, Product_Stock AS PS 
WHERE C.Cust_id = O.Cust_ID     
    AND P.Product_ID = OS.Product_ID     
    AND O.Order_ID = OS.Order_ID     
    AND PS.Product_ID = P.Product_ID 
GROUP BY Cust_id, C.Username;

-- Get a list of customers who spend more than average
CREATE VIEW HighSpenders AS
SELECT C.Cust_id, C.Username, SUM(OS.Count * PS.Price) AS Spent
FROM Customer AS C, Product AS P, Orders AS O, Order_Summary AS OS, Product_Stock AS PS 
WHERE C.Cust_id = O.Cust_ID     
    AND P.Product_ID = OS.Product_ID     
    AND O.Order_ID = OS.Order_ID     
    AND PS.Product_ID = P.Product_ID 
GROUP BY C.Cust_id, C.Username
HAVING SUM(OS.Count * PS.Price) > (
    SELECT SUM(Spent) / COUNT(*)
    FROM (
        SELECT C.Cust_id, C.Username, SUM(OS.Count * PS.Price) AS Spent
        FROM Customer AS C, Product AS P, Orders AS O, Order_Summary AS OS, Product_Stock AS PS 
        WHERE C.Cust_id = O.Cust_ID     
            AND P.Product_ID = OS.Product_ID     
            AND O.Order_ID = OS.Order_ID     
            AND PS.Product_ID = P.Product_ID 
        GROUP BY C.Cust_id, C.Username
    ) AS CustomersSpent
);
