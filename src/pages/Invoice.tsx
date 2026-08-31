import {
  Download,
  LockKeyhole,
  LogOut,
  Plus,
  Save,
  Trash2,
} from 'lucide-react';
import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import './invoice-print.css';

type DocumentKind = 'battery' | 'solar' | 'cctv' | 'invoice';

type Line = {
  description: string;
  hsn: string;
  quantity: number;
  unit: string;
  rate: number;
  gstRate: number;
};

type DocumentState = {
  number: string;
  date: string;
  ewayBill: string;
  validUntil: string;

  customer: string;
  address: string;
  gstin: string;
  contact: string;

  customerState: string;
  customerStateCode: string;
  placeOfSupply: string;

  subject: string;
  introduction: string;
  notes: string;
  terms: string;
  handledBy: string;

  bankName: string;
  accountNumber: string;
  ifsc: string;
  branch: string;

  lines: Line[];
};

type PaymentDetails = Pick<
  DocumentState,
  'bankName' | 'accountNumber' | 'ifsc' | 'branch'
>;

const OWNER_EMAIL = 'powerlink2008@gmail.com';

/*
  IMPORTANT:
  This is only a dummy/example GSTIN.
  Replace with the actual Power Link Technologies GSTIN.
*/
const COMPANY_GSTIN = '29ADOPV5535E1Z0';
const COMPANY_STATE = 'Karnataka';
const COMPANY_STATE_CODE = '29';

const kinds: {
  id: DocumentKind;
  label: string;
  title: string;
}[] = [
  {
    id: 'battery',
    label: 'Battery',
    title: 'Battery quotation',
  },
  {
    id: 'solar',
    label: 'Solar',
    title: 'Solar quotation',
  },
  {
    id: 'cctv',
    label: 'CCTV',
    title: 'CCTV quotation',
  },
  {
    id: 'invoice',
    label: 'Tax invoice',
    title: 'Tax invoice',
  },
];

const today = () => new Date().toISOString().slice(0, 10);

const newLine = (): Line => ({
  description: '',
  hsn: '',
  quantity: 1,
  unit: 'Nos',
  rate: 0,
  gstRate: 18,
});

const defaultPaymentDetails = (): PaymentDetails => ({
  bankName: 'Canara Bank',
  accountNumber: '125003168437',
  ifsc: 'CNRB0002727',
  branch: 'Sri Sathya Sai Hostel Branch',
});

const withPaymentDefaults = (
  details: Partial<PaymentDetails> = {},
): PaymentDetails => {
  const fallback = defaultPaymentDetails();

  return {
    bankName: details.bankName?.trim() || fallback.bankName,
    accountNumber:
      details.accountNumber?.trim() || fallback.accountNumber,
    ifsc: details.ifsc?.trim() || fallback.ifsc,
    branch: details.branch?.trim() || fallback.branch,
  };
};

const savedPaymentDetails = (): PaymentDetails => {
  try {
    return withPaymentDefaults(
      JSON.parse(
        localStorage.getItem('plt-invoice-payment-details') ?? '{}',
      ),
    );
  } catch {
    return defaultPaymentDetails();
  }
};

const defaults = (kind: DocumentKind): DocumentState => {
  const shared = {
    number: `PLT/${kind === 'invoice' ? 'INV' : 'QTN'}/001`,
    date: today(),
    ewayBill: '',
    validUntil: '',

    customer: '',
    address: '',
    gstin: '',
    contact: '',

    customerState: 'Karnataka',
    customerStateCode: '29',
    placeOfSupply: 'Karnataka',

    handledBy: 'Power Link Technologies',

    notes: 'Thank you for choosing Power Link Technologies.',

    terms:
      'Prices are inclusive of applicable taxes unless stated otherwise. Delivery and installation scope will be confirmed before dispatch.',

    ...defaultPaymentDetails(),
  };

  const preset = {
    battery: {
      subject: 'Proposal for battery backup solution',
      introduction:
        'We are pleased to submit our quotation for a reliable power-backup solution as discussed.',
      lines: [
        {
          ...newLine(),
          description: 'Tubular battery',
        },
        {
          ...newLine(),
          description: 'Battery installation and commissioning',
          unit: 'Job',
        },
      ],
    },

    solar: {
      subject: 'Proposal for solar power system',
      introduction:
        'We are pleased to submit our proposal for a dependable solar solution designed for your requirement.',
      lines: [
        {
          ...newLine(),
          description: 'Solar PV module',
          gstRate: 12,
        },
        {
          ...newLine(),
          description: 'Solar inverter',
          gstRate: 12,
        },
        {
          ...newLine(),
          description: 'Installation and commissioning',
          unit: 'Job',
        },
      ],
    },

    cctv: {
      subject: 'Proposal for CCTV surveillance system',
      introduction:
        'We are pleased to submit our quotation for the following security and surveillance equipment.',
      lines: [
        {
          ...newLine(),
          description: 'CCTV dome camera',
        },
        {
          ...newLine(),
          description: 'DVR / NVR',
        },
        {
          ...newLine(),
          description: 'Cabling and installation',
          unit: 'Job',
        },
      ],
    },

    invoice: {
      subject: '',
      introduction: '',
      lines: [
        {
          ...newLine(),
          description: 'Power solution / supply and installation',
        },
      ],
    },
  }[kind];

  return {
    ...shared,
    ...preset,
  };
};

const money = (value: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 2,
  }).format(value);

const lineAmount = (line: Line) => line.quantity * line.rate;

const belowTwenty = [
  '',
  'One',
  'Two',
  'Three',
  'Four',
  'Five',
  'Six',
  'Seven',
  'Eight',
  'Nine',
  'Ten',
  'Eleven',
  'Twelve',
  'Thirteen',
  'Fourteen',
  'Fifteen',
  'Sixteen',
  'Seventeen',
  'Eighteen',
  'Nineteen',
];

const tens = [
  '',
  '',
  'Twenty',
  'Thirty',
  'Forty',
  'Fifty',
  'Sixty',
  'Seventy',
  'Eighty',
  'Ninety',
];

const twoDigitWords = (value: number): string => {
  if (value < 20) return belowTwenty[value];

  const ten = Math.floor(value / 10);
  const unit = value % 10;

  return `${tens[ten]}${unit ? ` ${belowTwenty[unit]}` : ''}`;
};

const numberToWords = (value: number): string => {
  if (value === 0) return 'Zero';

  const parts: string[] = [];
  let remaining = Math.floor(value);

  const crore = Math.floor(remaining / 10000000);

  if (crore) {
    parts.push(`${numberToWords(crore)} Crore`);
    remaining %= 10000000;
  }

  const lakh = Math.floor(remaining / 100000);

  if (lakh) {
    parts.push(`${numberToWords(lakh)} Lakh`);
    remaining %= 100000;
  }

  const thousand = Math.floor(remaining / 1000);

  if (thousand) {
    parts.push(`${numberToWords(thousand)} Thousand`);
    remaining %= 1000;
  }

  const hundred = Math.floor(remaining / 100);

  if (hundred) {
    parts.push(`${belowTwenty[hundred]} Hundred`);
    remaining %= 100;
  }

  if (remaining) {
    parts.push(twoDigitWords(remaining));
  }

  return parts.join(' ');
};

const amountInWords = (value: number) => {
  const rupees = Math.floor(value);
  const paise = Math.round((value - rupees) * 100);

  let result = `INR ${numberToWords(rupees)} Rupees`;

  if (paise > 0) {
    result += ` and ${numberToWords(paise)} Paise`;
  }

  return `${result} Only`;
};

export default function Invoice() {
  const [authenticated, setAuthenticated] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState('');
  const [kind, setKind] = useState<DocumentKind>('battery');

  const [document, setDocument] = useState<DocumentState>(() => {
    const saved = localStorage.getItem('plt-document-battery');

    return saved
      ? {
          ...defaults('battery'),
          ...JSON.parse(saved),
        }
      : defaults('battery');
  });

  const [paymentDetails, setPaymentDetails] =
    useState<PaymentDetails>(savedPaymentDetails);

  const isInvoice = kind === 'invoice';

  const subtotal = useMemo(
    () =>
      document.lines.reduce(
        (sum, line) => sum + lineAmount(line),
        0,
      ),
    [document.lines],
  );

  const tax = useMemo(
    () =>
      document.lines.reduce(
        (sum, line) =>
          sum + (lineAmount(line) * line.gstRate) / 100,
        0,
      ),
    [document.lines],
  );

  const total = subtotal + tax;

  const cgst = tax / 2;
  const sgst = tax / 2;

  useEffect(() => {
    localStorage.setItem(
      `plt-document-${kind}`,
      JSON.stringify(document),
    );
  }, [kind, document]);

  useEffect(() => {
    localStorage.setItem(
      'plt-invoice-payment-details',
      JSON.stringify(paymentDetails),
    );
  }, [paymentDetails]);

  useEffect(() => {
    if (isInvoice) {
      setPaymentDetails(withPaymentDefaults(document));
    }
  }, [
    isInvoice,
    document.bankName,
    document.accountNumber,
    document.ifsc,
    document.branch,
  ]);

  useEffect(() => {
    fetch('/api/invoice-session', {
      credentials: 'include',
    })
      .then((response) => response.json())
      .then((data) =>
        setAuthenticated(Boolean(data.authenticated)),
      )
      .catch(() => setAuthenticated(false))
      .finally(() => setCheckingSession(false));
  }, []);

  const setField = <K extends keyof DocumentState>(
    key: K,
    value: DocumentState[K],
  ) => {
    setDocument((old) => ({
      ...old,
      [key]: value,
    }));
  };

  const setLine = (
    index: number,
    key: keyof Line,
    value: string,
  ) => {
    setDocument((old) => ({
      ...old,
      lines: old.lines.map((line, i) =>
        i === index
          ? {
              ...line,
              [key]: ['description', 'hsn', 'unit'].includes(key)
                ? value
                : Math.max(0, Number(value)),
            }
          : line,
      ),
    }));
  };

  const setPaymentField = <K extends keyof PaymentDetails>(
    key: K,
    value: PaymentDetails[K],
  ) => {
    setField(key, value);

    setPaymentDetails((old) => ({
      ...old,
      [key]: value,
    }));
  };

  const changeKind = (next: DocumentKind) => {
    const saved = localStorage.getItem(`plt-document-${next}`);

    const nextDocument = saved
      ? {
          ...defaults(next),
          ...JSON.parse(saved),
        }
      : defaults(next);

    setKind(next);

    setDocument(
      next === 'invoice'
        ? {
            ...nextDocument,
            ...paymentDetails,
          }
        : nextDocument,
    );
  };

  const login = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    setError('');

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch('/api/invoice-login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: form.get('email'),
          password: form.get('password'),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? 'Unable to sign in.');
        return;
      }

      setAuthenticated(true);
    } catch {
      setError(
        'Unable to reach the secure login service.',
      );
    }
  };

  const logout = async () => {
    await fetch('/api/invoice-logout', {
      method: 'POST',
      credentials: 'include',
    }).catch(() => undefined);

    setAuthenticated(false);
  };

  if (checkingSession) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#380707] px-4 font-sans text-stone-100">
        <p className="text-sm">Checking owner access…</p>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-[#380707] px-4 py-20 font-sans text-stone-100">
        <section className="mx-auto max-w-md border border-red-200/25 bg-[#550b0b] p-8 shadow-[0_24px_55px_rgba(0,0,0,.32)]">
          <div className="grid h-12 w-12 place-items-center bg-[#c51c1c] text-white">
            <LockKeyhole className="h-5 w-5" />
          </div>

          <h1 className="mt-8 text-3xl font-semibold tracking-tight">
            Power Link documents
          </h1>

          <p className="mt-3 text-sm leading-6 text-red-100">
            Private workspace for quotations, tax invoices,
            and PDF-ready documents.
          </p>

          <form onSubmit={login} className="mt-8">
            <label className="block text-sm font-medium">
              Owner email

              <input
                readOnly
                required
                type="email"
                name="email"
                autoComplete="email"
                value={OWNER_EMAIL}
                className="mt-2 w-full border border-red-100/30 bg-white/10 px-3 py-3 text-red-50 outline-none"
              />
            </label>

            <label className="mt-4 block text-sm font-medium">
              Password

              <input
                required
                type="password"
                name="password"
                autoComplete="current-password"
                autoFocus
                className="mt-2 w-full border border-red-100/30 bg-white/10 px-3 py-3 text-white outline-none"
              />
            </label>

            {error && (
              <p className="mt-3 text-sm text-amber-200">
                {error}
              </p>
            )}

            <button className="mt-6 w-full bg-[#c51c1c] px-4 py-3 text-sm font-bold text-white hover:bg-[#a91515]">
              Sign in
            </button>
          </form>

          <a
            href="/"
            className="mt-5 block text-center text-sm text-red-100 hover:text-white"
          >
            Back to website
          </a>
        </section>
      </main>
    );
  }

  const title =
    kinds.find((item) => item.id === kind)?.title ?? '';

  return (
    <main className="min-h-screen bg-[#f0eeee] font-sans text-slate-900 print:bg-white">
      {/* APP HEADER */}
      <header className="border-b border-red-200 bg-white print:hidden">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <a
            href="/"
            className="text-sm font-bold text-[#a91515]"
          >
            POWER LINK TECHNOLOGIES
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm text-slate-600"
            >
              <LogOut className="h-4 w-4" />
              Lock
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-[#b91c1c] px-4 py-2 text-sm font-semibold text-white"
            >
              <Download className="h-4 w-4" />
              Save as PDF
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-4 p-2 sm:p-4 lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-6 lg:p-5 print:block print:p-0">
        {/* SIDEBAR */}
        <aside className="print:hidden">
          <div className="border border-red-200 bg-white p-3">
            <p className="px-2 pb-3 text-xs font-semibold uppercase tracking-[.16em] text-slate-500">
              Document format
            </p>

            {kinds.map((item) => (
              <button
                key={item.id}
                onClick={() => changeKind(item.id)}
                className={`block w-full px-3 py-3 text-left text-sm font-semibold ${
                  kind === item.id
                    ? 'bg-[#b91c1c] text-white'
                    : 'text-slate-700 hover:bg-red-50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-4 border border-red-200 bg-white p-5">
            <p className="text-sm font-semibold">
              Your draft is saved here
            </p>

            <p className="mt-2 text-sm leading-5 text-slate-600">
              Each format keeps its own editable draft on this
              device.
            </p>

            <button
              onClick={() => setDocument(defaults(kind))}
              className="mt-5 text-sm font-semibold text-[#a91515] hover:underline"
            >
              Start this format again
            </button>
          </div>
        </aside>

        <div className="min-w-0">
          <div className="mb-4 flex flex-col gap-1 sm:mb-5 sm:flex-row sm:items-center sm:justify-between print:hidden">
            <h1 className="text-xl font-semibold">
              {title}
            </h1>

            <span className="inline-flex items-center gap-2 text-sm text-[#7a3131]">
              <Save className="h-4 w-4" />
              Saved automatically
            </span>
          </div>

          {/* A4 DOCUMENT */}
          <section
            className={`invoice-sheet ${
              isInvoice ? 'tax-invoice-sheet' : ''
            } mx-auto w-full max-w-5xl bg-white p-4 shadow-[0_18px_42px_rgba(69,10,10,.12)] sm:p-6 md:p-9 print:max-w-none print:p-0 print:shadow-none`}
          >
            <div className="border-t-[7px] border-[#b91c1c] pt-5">

              {/* DOCUMENT HEADER */}
              <header className="document-header grid gap-6 border-b-2 border-[#b91c1c] pb-5 md:grid-cols-[1.1fr_.9fr]">
                <div>
                  <div className="inline-grid h-11 w-11 place-items-center border-2 border-[#b91c1c] text-sm font-black text-[#b91c1c]">
                    PLT
                  </div>

                  <h2 className="mt-3 text-2xl font-bold tracking-tight text-[#b91c1c]">
                    POWER LINK TECHNOLOGIES
                  </h2>

                  <p className="mt-1 max-w-md text-xs leading-5 text-slate-600">
                    #67/68, Papamma Layout, 4th Cross, DMart Road,
                    <br />
                    Ramamurthy Nagar, Bangalore - 560016
                    <br />
                    9901893191 · powerlink2008@gmail.com
                  </p>

                  {isInvoice && (
                    <div className="company-tax-details mt-2 text-xs leading-5">
                      <p>
                        <b>GSTIN/UIN:</b> {COMPANY_GSTIN}
                      </p>

                      <p>
                        <b>State:</b> {COMPANY_STATE}
                        {' · '}
                        <b>Code:</b> {COMPANY_STATE_CODE}
                      </p>
                    </div>
                  )}
                </div>

                <div className="invoice-meta border border-red-200 bg-red-50 p-4">
                  <h3 className="text-center text-base font-bold uppercase tracking-wide text-[#991b1b]">
                    {isInvoice ? 'Tax Invoice' : 'Quotation'}
                  </h3>

                  <div className="mt-3 grid grid-cols-[98px_1fr] gap-y-2 text-xs">
                    <span className="font-semibold">
                      {isInvoice ? 'Invoice no.' : 'Reference no.'}
                    </span>

                    <input
                      value={document.number}
                      onChange={(e) =>
                        setField('number', e.target.value)
                      }
                      className="min-w-0 border-b border-red-300 bg-transparent outline-none"
                    />

                    <span className="font-semibold">
                      Date
                    </span>

                    <input
                      type="date"
                      value={document.date}
                      onChange={(e) =>
                        setField('date', e.target.value)
                      }
                      className="min-w-0 border-b border-red-300 bg-transparent outline-none"
                    />

                    {isInvoice && (
                      <>
                        <span className="font-semibold">
                          E-way bill no.
                        </span>

                        <input
                          value={document.ewayBill}
                          onChange={(e) =>
                            setField('ewayBill', e.target.value)
                          }
                          placeholder="Optional"
                          className="min-w-0 border-b border-red-300 bg-transparent outline-none"
                        />
                      </>
                    )}

                    {!isInvoice && (
                      <>
                        <span className="font-semibold">
                          Valid until
                        </span>

                        <input
                          type="date"
                          value={document.validUntil}
                          onChange={(e) =>
                            setField('validUntil', e.target.value)
                          }
                          className="min-w-0 border-b border-red-300 bg-transparent outline-none"
                        />

                        <span className="font-semibold">
                          Handled by
                        </span>

                        <input
                          value={document.handledBy}
                          onChange={(e) =>
                            setField('handledBy', e.target.value)
                          }
                          className="min-w-0 border-b border-red-300 bg-transparent outline-none"
                        />
                      </>
                    )}
                  </div>
                </div>
              </header>

              {/* CUSTOMER */}
              <div className="document-party my-6 grid gap-5 md:grid-cols-[1.1fr_.9fr]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-[#991b1b]">
                    {isInvoice ? 'Buyer (bill to)' : 'To'}
                  </p>

                  <input
                    value={document.customer}
                    onChange={(e) =>
                      setField('customer', e.target.value)
                    }
                    placeholder="Customer / company name"
                    className="mt-2 w-full border-b border-slate-400 py-1 text-lg font-bold outline-none placeholder:font-normal"
                  />

                  <textarea
                    value={document.address}
                    onChange={(e) =>
                      setField('address', e.target.value)
                    }
                    placeholder="Address"
                    className="mt-2 min-h-16 w-full resize-none border-b border-slate-300 py-1 text-sm leading-5 outline-none"
                  />
                </div>

                <div className="customer-extra md:border-l md:border-red-100 md:pl-5">
                  <p className="text-xs font-bold uppercase tracking-[.14em] text-[#991b1b]">
                    Customer details
                  </p>

                  <input
                    value={document.contact}
                    onChange={(e) =>
                      setField('contact', e.target.value)
                    }
                    placeholder="Contact number / email"
                    className="mt-2 w-full border-b border-slate-300 py-1.5 text-sm outline-none"
                  />

                  <input
                    value={document.gstin}
                    onChange={(e) =>
                      setField('gstin', e.target.value)
                    }
                    placeholder="GSTIN/UIN"
                    className="mt-1 w-full border-b border-slate-300 py-1.5 text-sm outline-none"
                  />

                  {isInvoice && (
                    <>
                      <div className="mt-1 grid grid-cols-[1fr_75px] gap-2">
                        <input
                          value={document.customerState}
                          onChange={(e) =>
                            setField(
                              'customerState',
                              e.target.value,
                            )
                          }
                          placeholder="State"
                          className="min-w-0 border-b border-slate-300 py-1.5 text-sm outline-none"
                        />

                        <input
                          value={document.customerStateCode}
                          onChange={(e) =>
                            setField(
                              'customerStateCode',
                              e.target.value,
                            )
                          }
                          placeholder="Code"
                          className="min-w-0 border-b border-slate-300 py-1.5 text-sm outline-none"
                        />
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-xs">
                        <span className="shrink-0 font-semibold">
                          Place of supply:
                        </span>

                        <input
                          value={document.placeOfSupply}
                          onChange={(e) =>
                            setField(
                              'placeOfSupply',
                              e.target.value,
                            )
                          }
                          className="min-w-0 flex-1 border-b border-slate-300 py-1.5 outline-none"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* QUOTATION INTRO */}
              {!isInvoice && (
                <div className="document-intro mb-6">
                  <input
                    value={document.subject}
                    onChange={(e) =>
                      setField('subject', e.target.value)
                    }
                    className="w-full border-b border-red-300 py-2 text-sm font-bold outline-none"
                  />

                  <textarea
                    value={document.introduction}
                    onChange={(e) =>
                      setField('introduction', e.target.value)
                    }
                    className="mt-3 min-h-14 w-full resize-none border-b border-slate-200 py-2 text-sm leading-6 text-slate-600 outline-none"
                  />
                </div>
              )}

              {/* ITEMS */}
              <div className="overflow-x-auto print:overflow-visible">
                <table className="document-items w-full min-w-[760px] border-collapse text-left text-xs print:min-w-0">
                  <thead className="bg-red-100 text-[#541010]">
                    <tr>
                      <th className="w-10 border border-red-300 p-2">
                        Sl.
                      </th>

                      <th className="border border-red-300 p-2">
                        Description of goods / service
                      </th>

                      {isInvoice && (
                        <th className="w-20 border border-red-300 p-2">
                          HSN/SAC
                        </th>
                      )}

                      <th className="w-16 border border-red-300 p-2">
                        GST
                      </th>

                      <th className="w-16 border border-red-300 p-2">
                        Qty
                      </th>

                      <th className="w-14 border border-red-300 p-2">
                        Unit
                      </th>

                      <th className="w-24 border border-red-300 p-2">
                        Rate
                      </th>

                      <th className="w-28 border border-red-300 p-2 text-right">
                        Amount
                      </th>

                      <th className="w-8 border border-red-300 p-2 print:hidden" />
                    </tr>
                  </thead>

                  <tbody>
                    {document.lines.map((line, index) => (
                      <tr key={index}>
                        <td className="border border-slate-300 p-2 align-top">
                          {index + 1}
                        </td>

                        <td className="border border-slate-300 p-1">
                          <input
                            value={line.description}
                            onChange={(e) =>
                              setLine(
                                index,
                                'description',
                                e.target.value,
                              )
                            }
                            className="w-full bg-transparent p-1 outline-none"
                          />
                        </td>

                        {isInvoice && (
                          <td className="border border-slate-300 p-1">
                            <input
                              value={line.hsn}
                              onChange={(e) =>
                                setLine(
                                  index,
                                  'hsn',
                                  e.target.value,
                                )
                              }
                              className="w-full bg-transparent p-1 outline-none"
                            />
                          </td>
                        )}

                        <td className="border border-slate-300 p-1">
                          <input
                            min="0"
                            type="number"
                            value={line.gstRate}
                            onChange={(e) =>
                              setLine(
                                index,
                                'gstRate',
                                e.target.value,
                              )
                            }
                            className="w-full bg-transparent p-1 outline-none"
                          />
                        </td>

                        <td className="border border-slate-300 p-1">
                          <input
                            min="0"
                            type="number"
                            value={line.quantity}
                            onChange={(e) =>
                              setLine(
                                index,
                                'quantity',
                                e.target.value,
                              )
                            }
                            className="w-full bg-transparent p-1 outline-none"
                          />
                        </td>

                        <td className="border border-slate-300 p-1">
                          <input
                            value={line.unit}
                            onChange={(e) =>
                              setLine(
                                index,
                                'unit',
                                e.target.value,
                              )
                            }
                            className="w-full bg-transparent p-1 outline-none"
                          />
                        </td>

                        <td className="border border-slate-300 p-1">
                          <input
                            min="0"
                            type="number"
                            value={line.rate}
                            onChange={(e) =>
                              setLine(
                                index,
                                'rate',
                                e.target.value,
                              )
                            }
                            className="w-full bg-transparent p-1 outline-none"
                          />
                        </td>

                        <td className="border border-slate-300 p-2 text-right font-semibold">
                          {money(lineAmount(line))}
                        </td>

                        <td className="border border-slate-300 p-1 text-center print:hidden">
                          <button
                            disabled={document.lines.length === 1}
                            onClick={() =>
                              setDocument((old) => ({
                                ...old,
                                lines: old.lines.filter(
                                  (_, i) => i !== index,
                                ),
                              }))
                            }
                            className="text-red-400 hover:text-red-600 disabled:opacity-30"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={() =>
                  setDocument((old) => ({
                    ...old,
                    lines: [...old.lines, newLine()],
                  }))
                }
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#a91515] hover:underline print:hidden"
              >
                <Plus className="h-4 w-4" />
                Add line item
              </button>

              {/* INVOICE AMOUNT IN WORDS */}
              {isInvoice && (
                <div className="amount-words mt-3 border border-red-200 bg-red-50 px-3 py-2 text-xs">
                  <b>Amount chargeable (in words):</b>{' '}
                  {amountInWords(total)}
                </div>
              )}

              {/* TAX ANALYSIS FOR INVOICE */}
              {isInvoice && (
                <section className="invoice-tax-analysis mt-3">
                  <p className="bg-red-100 px-2 py-1 text-center text-xs font-bold uppercase tracking-wide text-[#991b1b]">
                    Tax Analysis
                  </p>

                  <div className="overflow-x-auto print:overflow-visible">
                    <table className="tax-analysis-table w-full border-collapse text-xs">
                      <thead>
                        <tr>
                          <th rowSpan={2}>HSN/SAC</th>
                          <th rowSpan={2}>Taxable Value</th>
                          <th colSpan={2}>CGST</th>
                          <th colSpan={2}>SGST</th>
                          <th rowSpan={2}>
                            Total Tax
                          </th>
                        </tr>

                        <tr>
                          <th>Rate</th>
                          <th>Amount</th>
                          <th>Rate</th>
                          <th>Amount</th>
                        </tr>
                      </thead>

                      <tbody>
                        {document.lines.map((line, index) => {
                          const taxable = lineAmount(line);
                          const lineTax =
                            (taxable * line.gstRate) / 100;

                          return (
                            <tr key={index}>
                              <td>
                                {line.hsn || '—'}
                              </td>

                              <td className="text-right">
                                {money(taxable)}
                              </td>

                              <td className="text-center">
                                {line.gstRate / 2}%
                              </td>

                              <td className="text-right">
                                {money(lineTax / 2)}
                              </td>

                              <td className="text-center">
                                {line.gstRate / 2}%
                              </td>

                              <td className="text-right">
                                {money(lineTax / 2)}
                              </td>

                              <td className="text-right">
                                {money(lineTax)}
                              </td>
                            </tr>
                          );
                        })}

                        <tr className="font-bold">
                          <td>Total</td>

                          <td className="text-right">
                            {money(subtotal)}
                          </td>

                          <td />

                          <td className="text-right">
                            {money(cgst)}
                          </td>

                          <td />

                          <td className="text-right">
                            {money(sgst)}
                          </td>

                          <td className="text-right">
                            {money(tax)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              )}

              {/* TERMS + TOTAL/BANK */}
              <div className="document-summary mt-5 grid gap-5 md:grid-cols-[1fr_290px]">
                <div>
                  {isInvoice && (
                    <div className="invoice-bank border border-red-200 p-3">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#991b1b]">
                        Company&apos;s Bank Details
                      </p>

                      <div className="mt-2 grid gap-1.5 text-xs">
                        <label className="bank-row">
                          <span>Bank Name:</span>

                          <input
                            value={paymentDetails.bankName}
                            onChange={(e) =>
                              setPaymentField(
                                'bankName',
                                e.target.value,
                              )
                            }
                          />
                        </label>

                        <label className="bank-row">
                          <span>A/c No.:</span>

                          <input
                            value={paymentDetails.accountNumber}
                            onChange={(e) =>
                              setPaymentField(
                                'accountNumber',
                                e.target.value,
                              )
                            }
                          />
                        </label>

                        <label className="bank-row">
                          <span>IFS Code:</span>

                          <input
                            value={paymentDetails.ifsc}
                            onChange={(e) =>
                              setPaymentField(
                                'ifsc',
                                e.target.value,
                              )
                            }
                          />
                        </label>

                        <label className="bank-row">
                          <span>Branch:</span>

                          <input
                            value={paymentDetails.branch}
                            onChange={(e) =>
                              setPaymentField(
                                'branch',
                                e.target.value,
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>
                  )}

                  <div className="invoice-terms mt-3">
                    <p className="text-xs font-bold uppercase tracking-[.14em] text-[#991b1b]">
                      Terms & Conditions
                    </p>

                    {/* Editable screen version */}
                    <textarea
                      value={document.terms}
                      onChange={(e) =>
                        setField('terms', e.target.value)
                      }
                      className="terms-editor mt-2 min-h-16 w-full resize-none border border-slate-300 p-3 text-xs leading-5 outline-none"
                    />

                    {/* Single-line printed version */}
                    <p className="terms-print hidden">
                      {document.terms}
                    </p>
                  </div>

                  {isInvoice && (
                    <div className="invoice-declaration mt-3 text-xs leading-5">
                      <p className="font-bold">
                        Declaration
                      </p>

                      <p>
                        We declare that this invoice shows the
                        actual price of the goods/services
                        described and that all particulars are
                        true and correct.
                      </p>
                    </div>
                  )}
                </div>

                {/* TOTAL */}
                <div className="invoice-total border-t-2 border-[#b91c1c] pt-3 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <b>{money(subtotal)}</b>
                  </div>

                  {isInvoice ? (
                    <>
                      <div className="mt-2 flex justify-between">
                        <span>CGST</span>
                        <b>{money(cgst)}</b>
                      </div>

                      <div className="mt-2 flex justify-between">
                        <span>SGST</span>
                        <b>{money(sgst)}</b>
                      </div>
                    </>
                  ) : (
                    <div className="mt-2 flex justify-between">
                      <span>GST</span>
                      <b>{money(tax)}</b>
                    </div>
                  )}

                  <div className="mt-3 flex justify-between border-t border-slate-400 pt-3 text-lg font-bold text-[#991b1b]">
                    <span>Total</span>
                    <span>{money(total)}</span>
                  </div>
                </div>
              </div>

              {/* SIGNATURE */}
              <footer className="document-footer mt-5 grid gap-6 border-t border-red-200 pt-4 text-xs text-slate-600 md:grid-cols-2">
                <div>
                  <p className="font-bold text-slate-800">
                    {isInvoice
                      ? "Customer's Seal and Signature"
                      : 'Notes'}
                  </p>

                  {!isInvoice && (
                    <textarea
                      value={document.notes}
                      onChange={(e) =>
                        setField('notes', e.target.value)
                      }
                      className="mt-2 min-h-14 w-full resize-none border-b border-slate-300 py-1 leading-5 outline-none"
                    />
                  )}
                </div>

                <div className="self-end text-right">
                  <p className="font-bold text-slate-800">
                    for Power Link Technologies
                  </p>

                  <img
                    src="/brand/authorised-signature.png"
                    alt="Authorised signature"
                    className="ml-auto mt-1 h-12 w-32 object-contain object-right"
                  />

                  <div className="border-t border-slate-400 pt-1">
                    Authorised signatory
                  </div>
                </div>
              </footer>

              {/* BOTTOM STRIP LIKE YOUR THIRD IMAGE */}
              {isInvoice && (
                <div className="invoice-bottom-strip mt-3 text-center">
                  <p className="font-semibold">
                    SUBJECT TO BENGALURU JURISDICTION
                  </p>

                  <p>
                    This is a Computer Generated Invoice
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}