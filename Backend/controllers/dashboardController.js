
const Privilege = require('../Models/PrivilegeModel');
const Session = require('../Models/SessionModel');
const GeneralFunction = require('../Models/GeneralFunctionModel');
const getSessionIDs = require('./getSessionIDs');
const gf = new GeneralFunction();


module.exports = (socket, Database) => {
    socket.on('dashboardFetches', async (browserblob) => {
        let param = browserblob.param;
        let melody1 = browserblob.melody1;

        let session = getSessionIDs(melody1);
        let userid = session.userid;
        let sessionid = session.sessionid;
        
        const PrivilegeModel = new Privilege(Database);

        try {
            if (param === "") {
                socket.emit(melody1 + '_' + param, {
                    type: 'error',
                    message: 'Oops, something went wrong'
                });
            } else if (param === "dashboard_data") {
                const SalesModel = new Sales(Database);
                const ClientModel = new Client(Database);
                const VendorModel = new Vendor(Database);
                const OnlineShopViewModel = new OnlineShopView(Database)
                const PharmacySalesModel = new PharmacySales(Database);

                let outstandingInvoice = 0, invoicePayments = 0, totalCollections = 0, overallOutstanding = 0, totalClients = 0,
                processedInvoice = 0, processedProforma = 0, newClients = 0, totalVendors = 0, newVendors = 0, paidRequisitions = 0, 
                outstandingRequisitions = 0, processedRequisitions = 0, unprocessedRequisitions = 0, paidFinancialObligations = 0,
                outstandingFinancialObligation = 0, overallDebt = 0, totalExpenses = 0;

                if (privilegeData.administration.view_account_chart == 'yes') {
                    let invoiceData = await AccountRptApiModel.getInvoiceRecords(Database, {
                        sql: 'date_time LIKE ? AND status = ?',
                        columns: [gf.getMonth()+'%', 'active']
                    });
                    invoiceData = Array.isArray(invoiceData) && invoiceData.length > 0 ? invoiceData : [];
                    for (let i = 0; i < invoiceData.length; i++) {
                        const invoice = invoiceData[i];
    
                        if (invoice.type == 'invoice' || invoice.type == null) {
                            outstandingInvoice += (Number(invoice.invoiceTotal) - Number(invoice.totalPaid));
                            invoicePayments += Number(invoice.totalPaid);
                            processedInvoice++;
                        } else if (invoice.type == 'proforma') {
                            processedProforma++;
                        }
                    }
    
                    let collectionsData = await AccountRptApiModel.getCollectionRecords(Database, {
                        sql: 'date_time LIKE ? AND status = ?',
                        columns: [gf.getMonth()+'%', 'active']
                    });
                    collectionsData = Array.isArray(collectionsData) && collectionsData.length > 0 ? collectionsData : [];
                    for (let i = 0; i < collectionsData.length; i++) {
                        const collection = collectionsData[i];
                        totalCollections += Number(collection.grandTotal);
                    }
    
                    let oldDebtData = await AccountRptApiModel.getOldDebtRecords(Database, {
                        sql: 'invoiceid IN (SELECT clientid FROM client WHERE status = ?) AND payment_date LIKE ? AND status = ?',
                        columns: ['active', gf.getMonth()+'%', 'active']
                    });
                    oldDebtData = Array.isArray(oldDebtData) && oldDebtData.length > 0 ? oldDebtData : [];
                    for (let i = 0; i < oldDebtData.length; i++) {
                        const oldbebt = oldDebtData[i];
                        totalCollections += Number(oldbebt.grandTotal);
                    }
    
                    let clientData = await ClientModel.countFetch({
                        sql: 'status = ?',
                        columns: ['active']
                    });
                    totalClients = Array.isArray(clientData) && clientData.length > 0 ? clientData[0]['COUNT(clientid)'] : 0;
    
                    let newClientData = await ClientModel.countFetch({
                        sql: 'date_time LIKE ? AND status = ?',
                        columns: [gf.getMonth()+'%', 'active']
                    });
                    newClients = Array.isArray(newClientData) && newClientData.length > 0 ? newClientData[0]['COUNT(clientid)'] : 0;

                    clientData = await ClientModel.sumBalance({
                        sql: 'status = ?',
                        columns: ['active']
                    });
                    overallOutstanding = Array.isArray(clientData) && clientData.length > 0 ? Number(clientData[0]['SUM(balance)']) : 0;
    
                    let vendorData = await VendorModel.countFetch({
                        sql: 'status = ?',
                        columns: ['active']
                    });
                    totalVendors = Array.isArray(vendorData) && vendorData.length > 0 ? vendorData[0]['COUNT(vendorid)'] : 0;
    
                    let newVendorData = await VendorModel.countFetch({
                        sql: 'date_time LIKE ? AND status = ?',
                        columns: [gf.getMonth()+'%', 'active']
                    });
                    newVendors = Array.isArray(newVendorData) && newVendorData.length > 0 ? newVendorData[0]['COUNT(vendorid)'] : 0;

                    let requisitionData = await AccountRptApiModel.getRequisitionVoucherRecords(Database, {
                        sql: 'date_time LIKE ? AND status = ?',
                        columns: [gf.getMonth()+'%', 'marked as paid']
                    });
                    requisitionData = Array.isArray(requisitionData) && requisitionData.length > 0 ? requisitionData : [];
                    processedRequisitions = requisitionData.length;
                    for (let i = 0; i < requisitionData.length; i++) {
                        const item = requisitionData[i];
                        paidRequisitions += Number(item.subtotal);
                    }

                    requisitionData = await AccountRptApiModel.getRequisitionVoucherRecords(Database, {
                        sql: 'date_time LIKE ? AND status = ? OR date_time LIKE ? AND status = ? OR date_time LIKE ? AND status = ?',
                        columns: [gf.getMonth()+'%', 'active', gf.getMonth()+'%', 'authorized', gf.getMonth()+'%', 'approved']
                    });
                    requisitionData = Array.isArray(requisitionData) && requisitionData.length > 0 ? requisitionData : [];
                    unprocessedRequisitions = requisitionData.length;
                    for (let i = 0; i < requisitionData.length; i++) {
                        const item = requisitionData[i];
                        outstandingRequisitions += Number(item.subtotal);
                    }

                    let financialObligationData = await AccountRptApiModel.getFinancialObligationRecords(Database, {
                        sql: 'status = ?',
                        columns: ['active']
                    });
                    financialObligationData = Array.isArray(financialObligationData) && financialObligationData.length > 0 ? financialObligationData : [];
                    for (let i = 0; i < financialObligationData.length; i++) {
                        const item = financialObligationData[i];
                        outstandingFinancialObligation += Number(item.totalBalance);
                    }

                    let financialObligationPaymentData = await AccountRptApiModel.getFinancialObligationPaymentRecords(Database, {
                        sql: 'payment_date = ? AND status = ?',
                        columns: [gf.getMonth()+'%', 'active']
                    });
                    financialObligationPaymentData = Array.isArray(financialObligationPaymentData) && financialObligationPaymentData.length > 0 ? financialObligationPaymentData : [];
                    for (let i = 0; i < financialObligationPaymentData.length; i++) {
                        const item = financialObligationPaymentData[i];
                        paidFinancialObligations += (Number(item.paid_amount) * Number(item.exchange_rate));
                    }

                    let overallBusinessServiceData = await AccountRptApiModel.getBusinessServiceRecords(Database, {
                        sql: 'status = ?',
                        columns: ['active']
                    });
                    overallBusinessServiceData = Array.isArray(overallBusinessServiceData) && overallBusinessServiceData.length > 0 ? overallBusinessServiceData : [];
                    for (let i = 0; i < overallBusinessServiceData.length; i++) {
                        const item = overallBusinessServiceData[i];
                        overallDebt += Number(item.totalBalance);
                    }

                    let overallFinancialObligationData = await AccountRptApiModel.getFinancialObligationRecords(Database, {
                        sql: 'status = ?',
                        columns: ['active']
                    });
                    overallFinancialObligationData = Array.isArray(overallFinancialObligationData) && overallFinancialObligationData.length > 0 ? overallFinancialObligationData : [];
                    for (let i = 0; i < overallFinancialObligationData.length; i++) {
                        const item = overallFinancialObligationData[i];
                        overallDebt += Number(item.totalBalance);
                    }

                    let sales = await SalesModel.preparedFetch({
                        sql: 'date_time LIKE ? AND status = ?',
                        columns: [gf.getMonth()+'%', 'active']
                    });
                    sales = Array.isArray(sales) && sales.length > 0 ? sales : [];
                    for (let i = 0; i < sales.length; i++) {
                        const item = sales[i];
                        totalCollections += Number(item.paid_amount);
                    }

                    let pharmacySales = await PharmacySalesModel.preparedFetch({
                        sql: 'date_time LIKE ? AND status = ?',
                        columns: [gf.getMonth()+'%', 'active']
                    });
                    pharmacySales = Array.isArray(pharmacySales) && pharmacySales.length > 0 ? pharmacySales : [];
                    for (let i = 0; i < pharmacySales.length; i++) {
                        const item = pharmacySales[i];
                        totalCollections += Number(item.paid_amount);
                    }

                    let onlineSales = await OnlineShopViewModel.getGeneralSpecific({
                        table: 'online_shop_sales',
                        select: 'SUM(paid_amount) as payment, COUNT(salesid) AS number_of_invoices',
                        sql: 'date_time LIKE ? AND status = ?',
                        columns: [gf.getMonth()+'%', 'paid']
                    });
                    invoicePayments += Array.isArray(onlineSales) && onlineSales.length > 0 ? (onlineSales[0]['payment'] ? Number(onlineSales[0]['payment']) : 0) : 0;
                    processedInvoice += Array.isArray(onlineSales) && onlineSales.length > 0 ? (onlineSales[0]['number_of_invoices'] ? Number(onlineSales[0]['number_of_invoices']) : 0) : 0;

                    let onlineSalesOutstanding = await OnlineShopViewModel.getGeneralSpecific({
                        table: 'online_shop_sales',
                        select: 'SUM(grand_total) as payment, COUNT(salesid) AS number_of_invoices',
                        sql: 'date_time LIKE ? AND status = ?',
                        columns: [gf.getMonth()+'%', 'active']
                    });
                    outstandingInvoice += Array.isArray(onlineSalesOutstanding) && onlineSalesOutstanding.length > 0 ? (onlineSalesOutstanding[0]['payment'] ? Number(onlineSalesOutstanding[0]['payment']) : 0) : 0;
                    processedInvoice += Array.isArray(onlineSalesOutstanding) && onlineSalesOutstanding.length > 0 ? (onlineSalesOutstanding[0]['number_of_invoices'] ? Number(onlineSalesOutstanding[0]['number_of_invoices']) : 0) : 0;

                    let today = new Date();
                    let year = today.getUTCFullYear();
                    let month = (today.getUTCMonth() + 1);
                    month = month < 10 ? '0' + month : month;
                    totalExpenses = await AccountRptApiModel.getExpenses(Database, year + '-' + month);
                }

                socket.emit(melody1 + '_' + param, {
                    outstandingInvoice: outstandingInvoice,
                    invoicePayments: invoicePayments,
                    totalCollections: totalCollections,
                    overallOutstanding: overallOutstanding,
                    totalClients: totalClients,
                    processedInvoice: processedInvoice,
                    processedProforma: processedProforma,
                    newClients: newClients,
                    totalVendors: totalVendors,
                    newVendors: newVendors,
                    paidRequisitions: paidRequisitions,
                    outstandingRequisitions: outstandingRequisitions,
                    processedRequisitions: processedRequisitions,
                    unprocessedRequisitions: unprocessedRequisitions,
                    paidFinancialObligations: paidFinancialObligations,
                    outstandingFinancialObligation: outstandingFinancialObligation,
                    overallDebt: overallDebt,
                    totalExpenses: totalExpenses
                });
            }

        } catch (error) {
            console.log(error);
            socket.emit(melody1 + '_' + param, {
                type: 'error',
                message: 'mmmmmmmmmm: ' + error
            });
        }
    });
}
