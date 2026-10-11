import React, { useEffect, useMemo, useState } from "react";
import LayoutStu from "../Components/LayoutStu";
import { StudentData } from "../context/Student";
import { FaArrowUpRightFromSquare, FaMagnifyingGlass, FaReceipt, FaXmark } from "react-icons/fa6";

const formatAmount = (amount) =>
  `₹${(Number(amount) || 0).toLocaleString("en-IN")}`;

const StudentFeeReceipt = () => {
  const { feeshistory = [], studentData } = StudentData();
  console.log("feeshistory:", feeshistory);
  const [search, setSearch] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const paidTotal = feeshistory.reduce(
    (total, item) => total + (Number(item.submitFees) || 0),
    0,
  );
  const filteredHistory = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return feeshistory;

    return feeshistory.filter((item) =>
      [item.receipt, item.date, item.studentClass, item.paymentMethod]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(query)),
    );
  }, [feeshistory, search]);

  useEffect(() => {
    if (!previewImage) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === "Escape") setPreviewImage(null);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [previewImage]);

  return (
    <LayoutStu>
      <div className="min-h-screen bg-[#f6f3ec] bg-[radial-gradient(#ded8ca_0.65px,transparent_0.65px)] bg-[length:18px_18px] px-3 pb-6 pt-[94px] text-[#182036] sm:px-4 sm:pt-[100px] lg:px-8 lg:pb-9 xl:px-[54px]">
        <div className="mx-auto w-full">
          <header className="mb-[19px] flex items-center justify-between gap-5 sm:mb-[26px]">
            <div>
              <p className="mb-2 text-[9px] font-extrabold tracking-[1.5px] text-[#8a6b38] sm:mb-[11px] sm:text-[11px]">STUDENT PORTAL / FINANCE</p>
              <h1 className="text-[29px] font-extrabold leading-[1.1] text-[#182036] sm:text-[38px]">Fee receipts</h1>
              <p className="mt-[9px] max-w-[270px] text-[13px] leading-normal text-[#72766f] sm:max-w-none sm:text-[15px]">
                Payment history for {studentData?.studentName || "your account"}.
              </p>
            </div>
            <div className="grid h-[46px] w-[46px] shrink-0 place-items-center rounded-xl border border-[#e7c98e] bg-[#f8eacb] text-[18px] text-[#825c1c] sm:h-[58px] sm:w-[58px] sm:rounded-2xl sm:text-[22px]" aria-hidden="true">
              <FaReceipt />
            </div>
          </header>

          <section className="mb-4 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-[#e7e2d7] bg-[#e7e2d7] shadow-[0_8px_25px_rgba(24,32,54,0.04)] md:mb-6 md:grid-cols-[minmax(150px,0.8fr)_minmax(210px,1fr)_minmax(250px,1.4fr)]" aria-label="Fee summary">
            <div className="min-w-0 bg-[#fffefa] px-[13px] py-4 sm:px-[22px] sm:py-[19px]">
              <span className="block text-xs font-semibold text-[#72766f]">Receipts</span>
              <strong className="my-1 block text-xl font-extrabold leading-tight text-[#182036] sm:text-[25px]">{feeshistory.length}</strong>
              <small className="block text-xs font-semibold text-[#72766f]">payments recorded</small>
            </div>
            <div className="min-w-0 bg-[#fffefa] px-[13px] py-4 sm:px-[22px] sm:py-[19px]">
              <span className="block text-xs font-semibold text-[#72766f]">Total submitted</span>
              <strong className="my-1 block text-xl font-extrabold leading-tight text-[#247653] sm:text-[25px]">{formatAmount(paidTotal)}</strong>
              <small className="block text-xs font-semibold text-[#72766f]">across all receipts</small>
            </div>
            <div className="col-span-2 flex items-center gap-3 bg-[#fffefa] px-[13px] py-4 text-[11px] leading-relaxed text-[#59605d] sm:px-[22px] sm:py-[19px] sm:text-[13px] md:col-span-1">
              <span className="h-[9px] w-[9px] shrink-0 rounded-full bg-[#efaa43] shadow-[0_0_0_4px_#fbf1dc]" />
              <p className="m-0">Keep this history for your records. Contact the school office if a payment is missing.</p>
            </div>
          </section>

          <section className="overflow-hidden rounded-lg border border-[#e7e2d7] bg-[#fffefa] shadow-[0_12px_32px_rgba(24,32,54,0.05)]" aria-label="Payment history">
            <div className="grid gap-[13px] border-b border-[#e7e2d7] p-4 sm:flex sm:items-center sm:justify-between sm:gap-[18px] sm:p-[21px] sm:px-6">
              <div>
                <h2 className="m-0 text-[17px] font-extrabold">Payment history</h2>
                <p className="mb-0 mt-[5px] text-xs text-[#72766f]">{filteredHistory.length} {filteredHistory.length === 1 ? "receipt" : "receipts"} shown</p>
              </div>
              <label className="flex h-[42px] w-full items-center gap-[9px] rounded-md border border-[#dedbd2] bg-white px-3 text-[#85877f] focus-within:border-[#b98939] focus-within:ring-[3px] focus-within:ring-[#efaa432e] sm:w-[min(48%,290px)]">
                <FaMagnifyingGlass aria-hidden="true" className="shrink-0" />
                <span className="sr-only">Search receipts</span>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search receipts"
                  className="w-full min-w-0 border-0 bg-transparent text-[13px] text-[#182036] outline-none placeholder:text-[#9a9b95]"
                />
              </label>
            </div>

            {filteredHistory.length > 0 ? (
              <>
                <div className="hidden overflow-x-auto 2xl:block">
                  <table className="w-full border-collapse text-left">
                    <thead className="bg-[#f8f6f0] text-[10px] font-extrabold uppercase text-[#77786f]">
                      <tr className="[&>th:first-child]:pl-6">
                        <th className="whitespace-nowrap px-[15px] py-[13px]">Receipt</th>
                        <th className="whitespace-nowrap px-[15px] py-[13px]">Ledger ID</th>
                        <th className="whitespace-nowrap px-[15px] py-[13px]">Payment date</th>
                        <th className="whitespace-nowrap px-[15px] py-[13px]">Class</th>
                        <th className="whitespace-nowrap px-[15px] py-[13px]">Back dues</th>
                        <th className="whitespace-nowrap px-[15px] py-[13px]">Submitted</th>
                        <th className="whitespace-nowrap px-[15px] py-[13px]">Balance due</th>
                        <th className="whitespace-nowrap px-[15px] py-[13px]">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs text-[#555a59] [&>tr:hover]:bg-[#fcfaf5]">
                      {filteredHistory.map((item, index) => {
                        const isSettled = Number(item.dues) <= 0;
                        // console.log(item.receiptImage.url);
                        return (
                          <tr className="border-t border-[#efede7]" key={item._id || index}>
                            <td className="whitespace-nowrap px-[15px] py-4 pl-6">
                              <span className="flex items-center gap-[7px] font-extrabold text-[#182036]">{item.receiptImage?.url ? <button type="button" onClick={() => setPreviewImage(item.receiptImage.url)} aria-label={`View receipt image for ${item.receipt || "this payment"}`} className="cursor-pointer rounded border border-[#e7e2d7] bg-[#f3f1eb] p-0.5 transition hover:border-[#b98939] focus:outline-none focus:ring-2 focus:ring-[#efaa43]"><img src={item.receiptImage.url} alt="" className="h-14 w-14 object-contain" /></button> : <FaReceipt />}</span>
                              {/* <span className="ml-[18px] mt-1 block text-[10px] text-[#898b84]">Ledger {item.ledgerId || "N/A"}</span> */}
                            </td>
                            <td className="whitespace-nowrap text-[18px] px-[15px] py-4">{item.ledgerId || "N/A"}</td>
                            <td className="whitespace-nowrap text-[18px]  px-[15px] py-4">{item.date || "Date unavailable"}</td>
                            <td className="whitespace-nowrap text-[18px] px-[15px] py-4">{item.studentClass || "N/A"}</td>
                            <td className="whitespace-nowrap text-[18px] px-[15px] py-4">{formatAmount(item.backDues)}</td>
                            <td className="whitespace-nowrap text-[18px] px-[15px] py-4 font-extrabold text-[#247653]">{formatAmount(item.submitFees)}</td>
                            <td className="whitespace-nowrap text-[18px] px-[15px] py-4">{formatAmount(item.dues)}</td>
                            <td className="whitespace-nowrap text-[18px] px-[15px] py-4"><span className={`inline-flex items-center rounded px-2 py-[5px] text-[10px] font-extrabold ${isSettled ? "bg-[#e7f3eb] text-[#247653]" : "bg-[#fff0dc] text-[#965e11]"}`}>{isSettled ? "Settled" : "Balance due"}</span></td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-1 gap-[10px] p-[11px] sm:grid-cols-2 sm:gap-3 sm:p-4 2xl:hidden">
                  {filteredHistory.map((item, index) => {
                    const isSettled = Number(item.dues) <= 0;
                    return (
                      <article className="min-w-0 rounded-[7px] border border-[#e7e2d7] bg-white shadow-[0_5px_14px_rgba(24,32,54,0.04)]" key={item._id || index}>
                        <div className="flex min-w-0 items-center gap-[9px] border-b border-[#efede7] p-[13px] sm:gap-[11px] sm:p-[15px]">
                          {item.receiptImage?.url ? (
                            <button type="button" onClick={() => setPreviewImage(item.receiptImage.url)} aria-label={`View receipt image for ${item.receipt || "this payment"}`} className="h-[48px] w-[48px] shrink-0 cursor-zoom-in overflow-hidden rounded-md border border-[#e7e2d7] bg-[#f3f1eb] p-0.5 transition hover:border-[#b98939] focus:outline-none focus:ring-2 focus:ring-[#efaa43]">
                              <img src={item.receiptImage.url} alt="" className="h-full w-full object-contain" />
                            </button>
                          ) : (
                            <div className="grid h-[38px] w-[38px] shrink-0 place-items-center rounded-md bg-[#fbf0d9] text-[#8c641f]"><FaReceipt /></div>
                          )}
                          <div className="grid min-w-0 flex-1 gap-1">
                            <strong className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-[#182036] sm:text-[13px]">{item.receipt || "Fee payment"}</strong>
                            <span className="text-[11px] text-[#72766f]">{item.date || "Date unavailable"}</span>
                          </div>
                          <span className={`shrink-0 rounded px-1.5 py-1 text-[9px] font-extrabold sm:px-2 sm:text-[10px] ${isSettled ? "bg-[#e7f3eb] text-[#247653]" : "bg-[#fff0dc] text-[#965e11]"}`}>{isSettled ? "Settled" : "Balance due"}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-x-3 gap-y-[15px] p-[13px] sm:p-[15px]">
                          <div className="grid min-w-0 gap-[5px]"><span className="text-[10px] font-semibold text-[#72766f]">Class</span><strong className="break-words text-xs text-[#434949]">{item.studentClass || "N/A"}</strong></div>
                          <div className="grid min-w-0 gap-[5px]"><span className="text-[10px] font-semibold text-[#72766f]">Ledger ID</span><strong className="break-words text-xs text-[#434949]">{item.ledgerId || "N/A"}</strong></div>
                          <div className="grid min-w-0 gap-[5px]"><span className="text-[10px] font-semibold text-[#72766f]">Back dues</span><strong className="break-words text-xs text-[#434949]">{formatAmount(item.backDues)}</strong></div>
                          <div className="grid min-w-0 gap-[5px]"><span className="text-[10px] font-semibold text-[#72766f]">Balance due</span><strong className="break-words text-xs text-[#434949]">{formatAmount(item.dues)}</strong></div>
                        </div>
                        <div className="flex items-center justify-between gap-2.5 border-t border-[#efede7] bg-[#fbfaf6] px-[15px] py-[13px]">
                          <span className="text-[10px] font-semibold text-[#72766f]">Amount submitted</span>
                          <strong className="text-base text-[#247653]">{formatAmount(item.submitFees)}</strong>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="grid min-h-[250px] justify-items-center content-center px-5 py-[30px] text-center">
                <span className="grid h-[42px] w-[42px] place-items-center rounded-full bg-[#fbf0d9] text-[#916b2d]"><FaArrowUpRightFromSquare /></span>
                <h3 className="mb-[5px] mt-[15px] text-[15px] font-bold">{search ? "No matching receipts" : "No payments recorded yet"}</h3>
                <p className="m-0 max-w-[370px] text-xs leading-relaxed text-[#72766f]">{search ? "Try another receipt number, date, class, or payment method." : "Your submitted fee receipts will appear here."}</p>
              </div>
            )}
          </section>
          <footer className="px-1 pt-[18px] text-center text-xs text-[#74776f]">Questions about a payment? Please contact the school office.</footer>
        </div>
      </div>
      {previewImage && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#101522]/90 p-4 backdrop-blur-sm sm:p-8"
          role="presentation"
          onClick={() => setPreviewImage(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Receipt image preview"
            className="relative flex max-h-full max-w-full items-center justify-center"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPreviewImage(null)}
              aria-label="Close receipt image"
              className="absolute -right-2 -top-2 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-[#182036] text-xl text-white shadow-lg transition hover:bg-[#303c57] focus:outline-none focus:ring-2 focus:ring-[#efaa43] sm:-right-4 sm:-top-4"
            >
              <FaXmark />
            </button>
            <img
              src={previewImage}
              alt="Full-size fee receipt"
              className="max-h-[88vh] max-w-full rounded-md bg-white object-contain shadow-2xl"
            />
          </div>
        </div>
      )}
    </LayoutStu>
  );
};

export default StudentFeeReceipt;