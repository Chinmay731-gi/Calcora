export default function SeoContent() {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <article className="prose-custom">
          <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl">
            India Calculator – free online financial calculators
          </h2>
          <p className="mt-4 text-navy/70">
            India Calculator brings together the seven calculations Indian
            households and professionals look up most often: EMI, GST,
            salary, SIP, age, percentage and general loan repayment. Each
            tool runs entirely in your browser, so your numbers never leave
            your device.
          </p>

          <h3 className="mt-8 font-display text-xl font-bold text-navy">
            How EMI is calculated
          </h3>
          <p className="mt-2 text-navy/70">
            An EMI, or Equated Monthly Installment, is worked out from three
            inputs: the loan amount (principal), the annual interest rate,
            and the tenure in months. Lenders use the reducing-balance
            method, where the formula is:
          </p>
          <p className="mt-2 rounded-xl bg-offwhite px-4 py-3 font-mono text-sm text-navy">
            EMI = P × r × (1 + r)ⁿ / ((1 + r)ⁿ − 1)
          </p>
          <p className="mt-2 text-navy/70">
            Here, P is the principal, r is the monthly interest rate (annual
            rate divided by 12 and by 100), and n is the number of monthly
            installments. As you repay, the interest component of each EMI
            falls while the principal component rises, even though the EMI
            itself stays constant.
          </p>

          <h3 className="mt-8 font-display text-xl font-bold text-navy">
            Understanding GST calculations
          </h3>
          <p className="mt-2 text-navy/70">
            Goods and Services Tax (GST) in India is charged as a percentage
            of a base amount, at common slabs of 5%, 12%, 18% and 28%.
            Adding GST means multiplying the base amount by the rate and
            adding the result. Removing GST from a price that already
            includes tax means dividing the inclusive amount by
            (1 + rate/100) to recover the base amount.
          </p>
          <table className="mt-4 w-full border-collapse overflow-hidden rounded-xl text-left text-sm">
            <thead>
              <tr className="bg-navy text-white">
                <th className="px-4 py-2.5">GST slab</th>
                <th className="px-4 py-2.5">Typically applies to</th>
              </tr>
            </thead>
            <tbody>
              <tr className="odd:bg-offwhite">
                <td className="px-4 py-2 text-navy/80">5%</td>
                <td className="px-4 py-2 text-navy/80">Essential household items</td>
              </tr>
              <tr className="odd:bg-offwhite">
                <td className="px-4 py-2 text-navy/80">12%</td>
                <td className="px-4 py-2 text-navy/80">Processed food, some services</td>
              </tr>
              <tr className="odd:bg-offwhite">
                <td className="px-4 py-2 text-navy/80">18%</td>
                <td className="px-4 py-2 text-navy/80">Most standard goods and services</td>
              </tr>
              <tr className="odd:bg-offwhite">
                <td className="px-4 py-2 text-navy/80">28%</td>
                <td className="px-4 py-2 text-navy/80">Luxury and sin goods</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-xs text-navy/45">
            Slabs and applicability can change; always confirm the current
            rate for your specific goods or service.
          </p>

          <h3 className="mt-8 font-display text-xl font-bold text-navy">
            Salary, CTC and take-home pay
          </h3>
          <p className="mt-2 text-navy/70">
            Your Cost to Company (CTC) is the full amount your employer
            spends on you annually, made up of components like basic salary,
            HRA and allowances. Take-home pay is what remains after
            deductions such as employee provident fund contributions,
            professional tax and any other company-specific deductions.
            Because salary structures and applicable tax regimes vary by
            employer and individual choice, the salary calculator on this
            page gives an estimate rather than a final figure.
          </p>

          <h3 className="mt-8 font-display text-xl font-bold text-navy">
            How an SIP calculator projects growth
          </h3>
          <p className="mt-2 text-navy/70">
            A Systematic Investment Plan (SIP) involves investing a fixed
            amount every month, typically into a mutual fund. The SIP
            calculator projects a future value using compound growth at your
            expected annual return, assuming monthly compounding. This is an
            estimate: actual mutual fund returns move with the market and
            are never guaranteed.
          </p>

          <h3 className="mt-8 font-display text-xl font-bold text-navy">
            Percentage and loan calculations
          </h3>
          <ul className="mt-2 list-disc space-y-1.5 pl-5 text-navy/70">
            <li>To find X% of Y, multiply Y by X and divide by 100.</li>
            <li>To find what percentage X is of Y, divide X by Y and multiply by 100.</li>
            <li>Percentage increase or decrease compares a &ldquo;from&rdquo; value with a &ldquo;to&rdquo; value.</li>
            <li>A loan calculator applies the same EMI formula as above, and can also show a full month-by-month amortization schedule.</li>
          </ul>

          <p className="mt-8 text-sm text-navy/50">
            All figures on India Calculator are estimates for informational
            purposes and should not be treated as financial, tax or legal
            advice.
          </p>
        </article>
      </div>
    </section>
  );
}
