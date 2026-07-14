// types and dataset for 100 legal docs with page-level tracking

export type DocCategory = "act" | "judgment" | "pov" | "tax";

export interface DocPage {
  pageNumber: number;
  content: string;
}

export interface LegalDocument {
  id: string;
  title: string;
  category: DocCategory;
  subcategory: string;
  datePublished: string;
  source: string;
  pages: DocPage[];
  metadata: {
    jurisdiction?: string;
    court?: string;
    caseNumber?: string;
    ircSection?: string;
    author?: string;
    citedDocuments?: string[];
  };
}

export interface DocumentChunk {
  chunkId: string;
  docId: string;
  docTitle: string;
  category: DocCategory;
  pageNumber: number;
  content: string;
  tokenCount: number;
}

function generateActs(): LegalDocument[] {
  const acts: LegalDocument[] = [
    {
      id: "act-001",
      title: "Internal Revenue Code Section 61 - Gross Income Defined",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "1986-10-22",
      source: "26 U.S.C. Section 61",
      pages: [
        {
          pageNumber: 1,
          content: `26 U.S.C. Sec. 61(a) -- General definition. Except as otherwise provided in this subtitle, gross income means all income from whatever source derived, including (but not limited to) the following items: (1) Compensation for services, including fees, commissions, fringe benefits, and similar items; (2) Gross income derived from business; (3) Gains derived from dealings in property; (4) Interest; (5) Rents; (6) Royalties; (7) Dividends; (8) Annuities; (9) Income from life insurance and endowment contracts; (10) Pensions; (11) Income from discharge of indebtedness; (12) Distributive share of partnership gross income; (13) Income in respect of a decedent; (14) Income from an interest in an estate or trust. Sec. 61(b) provides cross references to Part II (items specifically included in gross income, Secs. 71 et seq.) and Part III (items specifically excluded from gross income, Secs. 101 et seq.). The provision was enacted August 16, 1954, ch. 736, 68A Stat. 17, and amended by Pub. L. 98-369 (1984) and Pub. L. 115-97 (2017).`
        },
        {
          pageNumber: 2,
          content: `Treas. Reg. Sec. 1.61-1(a) provides that gross income includes income realized in any form, whether in money, property, or services. Gross income is not limited to cash received; it includes income realized in any form including property, services, and the fair market value of barter transactions. The Supreme Court in Commissioner v. Glenshaw Glass Co., 348 U.S. 426, 431 (1955), held that Congress intended to exert "the full measure of its taxing power" under the Sixteenth Amendment through Sec. 61 and its predecessor provisions. The Court defined gross income as "undeniable accessions to wealth, clearly realized, and over which the taxpayers have complete dominion." This formulation replaced the narrower Eisner v. Macomber, 252 U.S. 189 (1920), definition that had described income as "gain derived from capital, from labor, or from both combined." Sec. 102 (gifts and inheritances), Sec. 103 (state and local bond interest), and Sec. 104 (compensation for injuries or sickness) provide specific exclusions; the taxpayer bears the burden of establishing entitlement to any exclusion. See also IRS Notice 2014-21 (virtual currency treated as property for federal tax purposes).`
        },
        {
          pageNumber: 3,
          content: `The fourteen categories enumerated in Sec. 61(a) are illustrative, not exhaustive. H.R. Rep. No. 83-1337, at A18 (1954) ("Gross income includes income realized in any form, whether in money, property, or services."). The Tax Court has consistently applied this broad construction. In Cesarini v. United States, 296 F. Supp. 3 (N.D. Ohio 1969), aff'd per curiam, 428 F.2d 812 (6th Cir. 1970), the court held that cash found inside a used piano constituted gross income under Sec. 61. In James v. United States, 366 U.S. 213 (1961), the Supreme Court ruled that embezzled funds are taxable income. Rev. Rul. 79-24, 1979-1 C.B. 60, confirmed that the fair market value of services received through barter arrangements constitutes gross income. The legislative history of the Tax Reform Act of 1986, Pub. L. 99-514, recodified the provision without substantive change. The interplay between Sec. 61 and the specific inclusion and exclusion provisions in Secs. 71 through 140 determines the scope of the individual income tax base for any given taxable year.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 61",
        citedDocuments: ["judgment-001", "judgment-003", "tax-001"]
      }
    },
    {
      id: "act-002",
      title: "Internal Revenue Code Section 162 - Trade or Business Expenses",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "1986-10-22",
      source: "26 U.S.C. Section 162",
      pages: [
        {
          pageNumber: 1,
          content: `26 U.S.C. Sec. 162(a) -- There shall be allowed as a deduction all the ordinary and necessary expenses paid or incurred during the taxable year in carrying on any trade or business, including: (1) a reasonable allowance for salaries or other compensation for personal services actually rendered; (2) traveling expenses (including amounts expended for meals and lodging other than amounts which are lavish or extravagant under the circumstances) while away from home in the pursuit of a trade or business; and (3) rentals or other payments required to be made as a condition to the continued use or possession, for purposes of the trade or business, of property to which the taxpayer has not taken or is not taking title or in which he has no equity. In Welch v. Helvering, 290 U.S. 111, 113-14 (1933), Justice Cardozo wrote: "One struggles in vain for any verbal formula that will supply a ready touchstone. The standard set up by the statute is not a rule of law; it is rather a way of life." The Court held that "ordinary" requires conformity to "the ways of conduct and the forms of speech prevailing in the business world."`
        },
        {
          pageNumber: 2,
          content: `Sec. 162(a)(1) permits deduction of "a reasonable allowance for salaries or other compensation for personal services actually rendered." Treas. Reg. Sec. 1.162-7(a) provides that the test of deductibility is whether the compensation is reasonable in amount and is in fact "purely for services." The Tax Court in Exacto Spring Corp. v. Commissioner, T.C. Memo 1998-220, rev'd, 196 F.3d 833 (7th Cir. 1999), applied a multi-factor analysis considering the employee's role, comparable salaries, the employer's financial condition, and prevailing rates. For publicly held corporations, Sec. 162(m) provides that no deduction is allowed for "applicable employee remuneration" exceeding $1,000,000 paid to any "covered employee." As amended by Pub. L. 115-97, Sec. 13601 (2017), the definition of covered employee was expanded and the performance-based compensation exception was eliminated for tax years beginning after December 31, 2017. Sec. 162(c) disallows deductions for illegal bribes, kickbacks, and other payments. Sec. 162(f), as amended by Pub. L. 115-97, Sec. 13306, disallows deductions for amounts paid to a government for violation of law.`
        },
        {
          pageNumber: 3,
          content: `Sec. 162(a)(2) allows deduction of traveling expenses "while away from home in the pursuit of a trade or business." In Commissioner v. Flowers, 326 U.S. 465 (1946), the Supreme Court required that travel expenses (i) be reasonable and necessary, (ii) be incurred while away from home, and (iii) arise in pursuit of business. The "tax home" is generally the taxpayer's principal place of business. Rev. Rul. 73-529, 1973-2 C.B. 37. In Rosenspan v. United States, 438 F.2d 905 (2d Cir. 1971), the court held itinerant taxpayers have no "home" for purposes of Sec. 162(a)(2). Sec. 274(n) limits the deduction for meal expenses to 50 percent. Pub. L. 115-97, Sec. 13304 (2017), eliminated deductions for entertainment, amusement, or recreation expenses effective for amounts paid after December 31, 2017. Sec. 274(d) imposes heightened substantiation requirements for travel, meals, and listed property, requiring contemporaneous records of amount, time, place, and business purpose. See also Cohan v. Commissioner, 39 F.2d 540 (2d Cir. 1930) (L. Hand, J.).`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 162",
        citedDocuments: ["judgment-004", "judgment-005", "tax-003"]
      }
    },
    {
      id: "act-003",
      title: "Internal Revenue Code Section 501(c)(3) - Tax Exempt Organizations",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "1986-10-22",
      source: "26 U.S.C. Section 501(c)(3)",
      pages: [
        {
          pageNumber: 1,
          content: `Section 501(c)(3) of the Internal Revenue Code provides tax exemption for corporations, community chests, funds, or foundations organized and operated exclusively for religious, charitable, scientific, testing for public safety, literary, or educational purposes, or to foster national or international amateur sports competition, or for the prevention of cruelty to children or animals. No part of the net earnings may inure to the benefit of any private shareholder or individual. The organization must not participate or intervene in any political campaign on behalf of or in opposition to any candidate for public office. It must also limit its lobbying activities to an insubstantial part of its overall activities unless it makes an election under Section 501(h). These requirements are known as the organizational test and the operational test. The organizational test examines the entity's governing documents while the operational test examines its actual activities.`
        },
        {
          pageNumber: 2,
          content: `The term charitable under Section 501(c)(3) is interpreted broadly by Treasury regulations and includes relief of the poor, advancement of education or science, lessening the burdens of government, and promotion of social welfare. The IRS applies a community benefit standard to determine whether a hospital qualifies as charitable. Revenue Ruling 69-545 established that a nonprofit hospital providing emergency care to all persons regardless of ability to pay and otherwise benefiting the community satisfies the charitable requirement. The private benefit doctrine prohibits exempt organizations from serving private interests more than incidentally. The private inurement prohibition is an absolute bar that applies specifically to insiders, meaning persons with a personal and private interest in the organization's activities. Violation of either prohibition can result in revocation of exempt status. Section 4958 provides intermediate sanctions in the form of excise taxes on excess benefit transactions as an alternative to revocation.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 501(c)(3)",
        citedDocuments: ["judgment-006", "tax-005"]
      }
    },
    {
      id: "act-004",
      title: "Internal Revenue Code Section 1031 - Like-Kind Exchanges",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "1986-10-22",
      source: "26 U.S.C. Section 1031",
      pages: [
        {
          pageNumber: 1,
          content: `26 U.S.C. Sec. 1031(a)(1) -- No gain or loss shall be recognized on the exchange of real property held for productive use in a trade or business or for investment if such real property is exchanged solely for real property of like kind which is to be held either for productive use in a trade or business or for investment. Sec. 1031(a)(2), as amended by Pub. L. 115-97, Sec. 13303 (2017), eliminated like-kind exchange treatment for personal property effective for exchanges completed after December 31, 2017. Sec. 1031(h) provides that real property located in the United States and real property located outside the United States are not property of a like kind. Treas. Reg. Sec. 1.1031(a)-1(b) interprets the like-kind requirement broadly for real property: "the words 'like kind' refer to the nature or character of the property and not to its grade or quality." Improved real property may be exchanged for unimproved real property. A fee simple interest may be exchanged for a leasehold of 30 years or more. See also Starker v. United States, 602 F.2d 1341 (9th Cir. 1979) (establishing deferred exchange framework prior to statutory codification).`
        },
        {
          pageNumber: 2,
          content: `Sec. 1031(a)(3) imposes identification and timing requirements for deferred exchanges. The replacement property must be identified within 45 days after the date on which the taxpayer transfers the relinquished property. The replacement property must be received not later than the earlier of (A) the day which is 180 days after the transfer, or (B) the due date (including extensions) for the transferor's tax return for the taxable year of the transfer. Treas. Reg. Sec. 1.1031(k)-1(c) sets forth the three-property rule (up to three properties without regard to value), the 200-percent rule (any number of properties if aggregate fair market value does not exceed 200 percent of the relinquished property), and the 95-percent rule. Treas. Reg. Sec. 1.1031(k)-1(g)(4) defines "qualified intermediary" and imposes restrictions on related parties and agents. Rev. Proc. 2000-37, 2000-2 C.B. 308, provides a safe harbor for reverse exchanges through "exchange accommodation titleholders." Sec. 1031(b) provides that if an exchange is not solely in kind, gain is recognized to the extent of boot received. Sec. 1031(d) sets the basis of acquired property equal to the basis of the relinquished property, decreased by money received and increased by gain recognized.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 1031",
        citedDocuments: ["judgment-007", "tax-006"]
      }
    },
    {
      id: "act-005",
      title: "Internal Revenue Code Section 170 - Charitable Contributions",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "1986-10-22",
      source: "26 U.S.C. Section 170",
      pages: [
        {
          pageNumber: 1,
          content: `Section 170 of the Internal Revenue Code allows a deduction for charitable contributions made within the taxable year. A charitable contribution is defined as a contribution or gift to or for the use of qualified organizations described in Section 170(c). These include the United States or any state or local government if the contribution is made exclusively for public purposes, corporations organized and operated exclusively for religious charitable scientific literary or educational purposes, veterans organizations, fraternal societies operating under the lodge system, and certain cemetery companies. The contribution must be made with donative intent and without the expectation of receiving a commensurate benefit in return. A payment to a charity where the donor receives goods or services in return is deductible only to the extent the payment exceeds the fair market value of the benefit received. This is known as the quid pro quo contribution rule and organizations receiving such payments exceeding 75 dollars must provide written disclosure to the donor.`
        },
        {
          pageNumber: 2,
          content: `Percentage limitations apply to the charitable deduction based on the type of property donated and the type of recipient organization. For cash contributions to public charities, the deduction is limited to 60 percent of the taxpayer's adjusted gross income. For appreciated capital gain property contributed to public charities, the limit is 30 percent of adjusted gross income. Contributions to private foundations are subject to a 30 percent limit for cash and 20 percent for appreciated property. Excess contributions may be carried forward for up to five years. Contributions of property generally entitle the donor to a deduction equal to the property's fair market value. However, for ordinary income property and short term capital gain property, the deduction is limited to the property's adjusted basis. Special rules apply to contributions of tangible personal property, intellectual property, vehicles, clothing and household items, and conservation easements. Substantiation requirements vary based on the amount of the contribution with increasing documentation requirements for larger gifts.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 170",
        citedDocuments: ["judgment-008", "tax-007"]
      }
    },
    {
      id: "act-006",
      title: "Internal Revenue Code Section 401(k) - Qualified Cash or Deferred Arrangements",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "1986-10-22",
      source: "26 U.S.C. Section 401(k)",
      pages: [
        {
          pageNumber: 1,
          content: `Section 401(k) of the Internal Revenue Code permits employees to elect to have a portion of their compensation contributed to a qualified retirement plan on a pre-tax basis rather than receiving it as current taxable compensation. These arrangements are formally known as qualified cash or deferred arrangements. The elective deferrals reduce the employee's current taxable income but remain subject to Social Security and Medicare taxes under FICA. The annual limit on elective deferrals is adjusted for inflation and was set at 23,000 dollars for 2024 with an additional catch-up contribution of 7,500 dollars available to participants age 50 and older. Employer matching contributions are not counted toward this limit but are subject to the overall Section 415 limit on annual additions. The plan must satisfy coverage requirements under Section 410(b) and nondiscrimination requirements ensuring that highly compensated employees do not benefit disproportionately. Safe harbor 401(k) plans that provide specified employer contributions are deemed to satisfy nondiscrimination testing.`
        },
        {
          pageNumber: 2,
          content: `Distributions from a 401(k) plan are generally taxable as ordinary income in the year received. Early distributions before age 59 and a half are subject to a 10 percent additional tax under Section 72(t) unless an exception applies. Exceptions include distributions due to death or disability, separation from service after age 55, substantially equal periodic payments, qualified medical expenses, and certain other specified circumstances. Required minimum distributions must begin by April 1 of the year following the year the participant reaches age 73 under the SECURE 2.0 Act provisions. Roth 401(k) contributions are made on an after-tax basis but qualified distributions of both contributions and earnings are tax free. A plan may offer designated Roth contributions as an alternative to traditional pre-tax deferrals. Participants may also roll over plan balances to individual retirement accounts or other eligible plans upon separation from service. In-service withdrawals are generally restricted though hardship distributions may be available for immediate and heavy financial needs as defined by Treasury regulations.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 401(k)",
        citedDocuments: ["tax-008", "tax-009"]
      }
    },
    {
      id: "act-007",
      title: "Internal Revenue Code Section 199A - Qualified Business Income Deduction",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "2017-12-22",
      source: "26 U.S.C. Section 199A",
      pages: [
        {
          pageNumber: 1,
          content: `Section 199A was enacted as part of the Tax Cuts and Jobs Act of 2017 and provides a deduction equal to 20 percent of qualified business income from a pass-through entity or sole proprietorship. The deduction is available to individuals, estates, and trusts with qualified business income. Qualified business income means the net amount of qualified items of income, gain, deduction, and loss with respect to any qualified trade or business of the taxpayer. Investment items, reasonable compensation paid by an S corporation, and guaranteed payments from a partnership are excluded. The deduction is limited to the lesser of 20 percent of qualified business income or the greater of 50 percent of W-2 wages paid by the business or 25 percent of W-2 wages plus 2.5 percent of the unadjusted basis of qualified property held by the business. These limitations phase in for taxpayers above specified income thresholds which are adjusted annually for inflation.`
        },
        {
          pageNumber: 2,
          content: `Specified service trades or businesses are subject to additional restrictions under Section 199A. These include businesses involving the performance of services in the fields of health, law, accounting, actuarial science, performing arts, consulting, athletics, financial services, brokerage services, and any trade or business where the principal asset is the reputation or skill of one or more employees or owners. Taxpayers with taxable income below the threshold amount may claim the full Section 199A deduction regardless of whether the business is a specified service trade or business. For taxpayers above the threshold, the deduction for specified service businesses phases out entirely. The Section 199A deduction cannot exceed 20 percent of the taxpayer's taxable income calculated before the deduction and reduced by net capital gains. Aggregation of multiple trades or businesses is permitted under certain conditions specified in the regulations. The deduction is set to expire after December 31, 2025, unless extended by Congress.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 199A",
        citedDocuments: ["tax-010", "pov-003"]
      }
    },
    {
      id: "act-008",
      title: "Internal Revenue Code Section 482 - Allocation of Income Among Related Taxpayers",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "1986-10-22",
      source: "26 U.S.C. Section 482",
      pages: [
        {
          pageNumber: 1,
          content: `Section 482 authorizes the Secretary of the Treasury to distribute, apportion, or allocate gross income, deductions, credits, or allowances between or among two or more organizations, trades, or businesses owned or controlled directly or indirectly by the same interests, if the Secretary determines that such distribution is necessary to prevent evasion of taxes or to clearly reflect the income of any such organization. The arm's length standard is the fundamental principle underlying Section 482. This standard requires that controlled transactions produce results consistent with those that would have been realized if uncontrolled taxpayers had engaged in the same transaction under the same circumstances. The regulations under Section 482 provide detailed methods for determining arm's length results for transfers of tangible property, intangible property, services, and loans. The comparable uncontrolled price method, the resale price method, the cost plus method, the comparable profits method, and the profit split method are the primary transfer pricing methods.`
        },
        {
          pageNumber: 2,
          content: `The transfer pricing regulations under Section 482 require taxpayers to select the best method for determining arm's length results based on the comparability of the controlled and uncontrolled transactions and the quality of the available data. Taxpayers must prepare contemporaneous documentation supporting their transfer pricing methodology to avoid penalties under Section 6662(e). The penalty for a substantial valuation misstatement is 20 percent of the underpayment attributable to the misstatement and increases to 40 percent for a gross valuation misstatement. Advance pricing agreements allow taxpayers to negotiate with the IRS in advance regarding the appropriate transfer pricing methodology for prospective transactions. The cost sharing regulations under Section 482 address arrangements where controlled participants share the costs and risks of developing intangible property in proportion to their reasonably anticipated benefits. The Tax Cuts and Jobs Act added the BEAT provisions under Section 59A which impose a minimum tax on certain payments made by domestic corporations to foreign related parties creating additional transfer pricing considerations.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 482",
        citedDocuments: ["judgment-009", "judgment-010"]
      }
    },
    {
      id: "act-009",
      title: "Securities Exchange Act of 1934 - Section 10(b) Anti-Fraud Provisions",
      category: "act",
      subcategory: "Securities Law",
      datePublished: "1934-06-06",
      source: "15 U.S.C. Section 78j(b)",
      pages: [
        {
          pageNumber: 1,
          content: `Section 10(b) of the Securities Exchange Act of 1934 makes it unlawful for any person to use or employ in connection with the purchase or sale of any security any manipulative or deceptive device or contrivance in contravention of rules and regulations prescribed by the Securities and Exchange Commission. Rule 10b-5 promulgated under this section prohibits making any untrue statement of material fact or omitting a material fact necessary to make statements made not misleading in connection with the purchase or sale of securities. The Supreme Court has established six elements for a private cause of action under Rule 10b-5: a material misrepresentation or omission, scienter (intent to deceive), a connection with the purchase or sale of a security, reliance, economic loss, and loss causation. The fraud-on-the-market theory established in Basic v. Levinson (1988) creates a rebuttable presumption of reliance for securities traded in efficient markets. This presumption is central to the certification of securities fraud class actions.`
        },
        {
          pageNumber: 2,
          content: `Insider trading liability under Section 10(b) and Rule 10b-5 has developed primarily through judicial decisions rather than statutory definition. The classical theory holds that corporate insiders who trade on material nonpublic information violate their fiduciary duty to the corporation's shareholders. The misappropriation theory, adopted by the Supreme Court in United States v. O'Hagan (1997), extends liability to persons who misappropriate confidential information in breach of a duty owed to the source of the information and trade on that information. Tipper-tippee liability, established in Dirks v. SEC (1983), holds that a tippee is liable when the tipper breached a fiduciary duty by disclosing material nonpublic information for a personal benefit and the tippee knew or should have known of that breach. The Private Securities Litigation Reform Act of 1995 imposed heightened pleading requirements for securities fraud actions and created a safe harbor for forward-looking statements. The Securities Litigation Uniform Standards Act of 1998 preempts certain state law class actions relating to nationally traded securities.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["judgment-011", "judgment-012"]
      }
    },
    {
      id: "act-010",
      title: "Employee Retirement Income Security Act (ERISA) - Fiduciary Standards",
      category: "act",
      subcategory: "Employment Law",
      datePublished: "1974-09-02",
      source: "29 U.S.C. Sections 1001-1461",
      pages: [
        {
          pageNumber: 1,
          content: `The Employee Retirement Income Security Act of 1974 establishes minimum standards for most voluntarily established retirement and health plans in private industry. ERISA requires plans to provide participants with information about plan features and funding, sets minimum standards for participation, vesting, benefit accrual, and funding, and establishes fiduciary responsibilities for those who manage plan assets. Section 404 of ERISA imposes a prudent person standard requiring fiduciaries to discharge their duties solely in the interest of participants and beneficiaries and for the exclusive purpose of providing benefits and defraying reasonable expenses of administering the plan. Fiduciaries must act with the care, skill, prudence, and diligence that a prudent person acting in a like capacity and familiar with such matters would use. The duty to diversify plan investments requires fiduciaries to minimize the risk of large losses unless under the circumstances it is clearly prudent not to do so.`
        },
        {
          pageNumber: 2,
          content: `ERISA Section 406 prohibits certain transactions between the plan and parties in interest including fiduciaries, service providers, employers, unions, and their relatives. Prohibited transactions include sales or exchanges of property, loans, furnishing goods or services, and transfers of plan assets to a party in interest. Section 408 provides exemptions from the prohibited transaction rules for certain types of transactions that the Department of Labor determines are administratively feasible, in the interest of the plan, and protective of plan participants. Individual exemptions may be granted upon application. ERISA preempts state laws that relate to employee benefit plans under Section 514, creating a comprehensive federal regulatory framework. However, the savings clause preserves state regulation of insurance, banking, and securities. The Supreme Court has interpreted ERISA preemption broadly but has recognized limits, particularly regarding state laws of general applicability that affect plans only indirectly. ERISA provides both civil and criminal enforcement mechanisms and allows participants to bring actions for benefits, breach of fiduciary duty, and equitable relief.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["judgment-013", "judgment-014"]
      }
    },
    {
      id: "act-011",
      title: "Internal Revenue Code Section 267 - Losses Between Related Taxpayers",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "1986-10-22",
      source: "26 U.S.C. Section 267",
      pages: [
        {
          pageNumber: 1,
          content: `Section 267 of the Internal Revenue Code disallows deductions for losses on sales or exchanges of property between related persons. The provision also governs the timing of deductions for expenses and interest owed to related parties under the matching principle. Related persons under Section 267(b) include members of a family defined as siblings, spouses, ancestors, and lineal descendants. The definition also covers an individual and a corporation if the individual owns more than 50 percent in value of the outstanding stock, two corporations that are members of the same controlled group, a fiduciary and a beneficiary of the same trust, and other specified relationships. Constructive ownership rules under Section 267(c) attribute stock ownership from entities to their owners and between family members for purposes of determining relatedness. If a loss is disallowed under Section 267, the transferee may reduce any gain on a subsequent sale to an unrelated party by the amount of the previously disallowed loss.`
        },
        {
          pageNumber: 2,
          content: `The matching principle under Section 267(a)(2) prevents a taxpayer using the accrual method from deducting an expense owed to a related cash-method taxpayer until the payee includes the amount in income. This rule prevents related parties from using different accounting methods to create a mismatch in the timing of income and deduction. The provision applies to all types of deductible expenses including interest, compensation, rents, and management fees. Section 267(a)(3) extends the matching principle to payments to foreign related parties subject to withholding tax, deferring the deduction until the amount is paid and the withholding tax is deposited. The regulations provide detailed rules for applying these timing restrictions in complex multi-party arrangements. Courts have upheld the broad scope of Section 267 as necessary to prevent income shifting among related persons and have generally declined to apply equitable exceptions to the statutory disallowance rules.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 267",
        citedDocuments: ["act-008", "tax-011"]
      }
    },
    {
      id: "act-012",
      title: "Sarbanes-Oxley Act of 2002 - Corporate Accountability",
      category: "act",
      subcategory: "Securities Law",
      datePublished: "2002-07-30",
      source: "Pub. L. 107-204",
      pages: [
        {
          pageNumber: 1,
          content: `The Sarbanes-Oxley Act of 2002 was enacted in response to major corporate accounting scandals including Enron and WorldCom. The Act established the Public Company Accounting Oversight Board to oversee the audits of public companies and created new standards for corporate accountability and enhanced financial disclosures. Section 302 requires the principal executive and financial officers of a public company to certify in each annual and quarterly report that they have reviewed the report, that based on their knowledge the report does not contain any untrue statement of material fact or omit a material fact necessary to make the statements not misleading, and that the financial statements fairly present in all material respects the financial condition and results of operations. Section 404 requires management to assess and report on the effectiveness of internal controls over financial reporting and requires the external auditor to attest to management's assessment. This requirement has been one of the most significant and costly provisions of the Act.`
        },
        {
          pageNumber: 2,
          content: `Section 906 of the Sarbanes-Oxley Act imposes criminal penalties for certifying officers who knowingly or willfully certify financial statements that do not comply with the requirements. Knowing violations carry penalties of up to one million dollars in fines and ten years of imprisonment while willful violations carry penalties of up to five million dollars and twenty years. Section 802 makes it a criminal offense to knowingly alter, destroy, mutilate, or conceal documents with the intent to impede a federal investigation. Section 806 provides whistleblower protections for employees of publicly traded companies who report suspected securities fraud. The Act also addresses conflicts of interest for securities analysts, requires enhanced disclosure of off-balance-sheet transactions, and prohibits personal loans to executive officers and directors. Section 301 requires audit committees to be composed entirely of independent directors and establishes procedures for handling complaints regarding accounting and auditing matters.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["judgment-015", "pov-007"]
      }
    },
    {
      id: "act-013",
      title: "Internal Revenue Code Section 469 - Passive Activity Losses",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "1986-10-22",
      source: "26 U.S.C. Section 469",
      pages: [
        {
          pageNumber: 1,
          content: `Section 469 limits the deductibility of losses and credits from passive activities. A passive activity is any activity involving the conduct of a trade or business in which the taxpayer does not materially participate and any rental activity regardless of participation. Material participation requires the taxpayer to be involved in the operations of the activity on a regular, continuous, and substantial basis. Treasury Regulation 1.469-5T provides seven tests for material participation including working 500 or more hours in the activity during the year, constituting substantially all participation in the activity, and participating more than 100 hours when no other individual participates more. Passive activity losses may only be deducted against passive activity income. Excess passive losses are suspended and carried forward to offset future passive income or are fully deductible when the taxpayer disposes of the entire interest in the passive activity in a fully taxable transaction to an unrelated party.`
        },
        {
          pageNumber: 2,
          content: `The rental activity rules under Section 469 treat all rental activities as passive regardless of the taxpayer's level of participation. However, Section 469(i) provides a special allowance of up to 25,000 dollars for rental real estate activities in which the taxpayer actively participates. Active participation is a lower standard than material participation and requires the taxpayer to participate in management decisions such as approving tenants, setting rental terms, and approving capital expenditures. The 25,000 allowance phases out by 50 percent of the amount by which adjusted gross income exceeds 100,000 dollars and is fully eliminated at 150,000 dollars. Real estate professionals who spend more than 750 hours and more than half of their personal services in real property trades or businesses may treat rental activities as nonpassive under Section 469(c)(7). Each rental property is treated as a separate activity unless the taxpayer elects to aggregate all rental properties as a single activity. Grouping rules under Treasury Regulation 1.469-4 allow taxpayers to group related trade or business activities as a single activity for purposes of the material participation tests.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 469",
        citedDocuments: ["judgment-016", "tax-012"]
      }
    },
    {
      id: "act-014",
      title: "Foreign Account Tax Compliance Act (FATCA)",
      category: "act",
      subcategory: "International Tax",
      datePublished: "2010-03-18",
      source: "26 U.S.C. Sections 1471-1474",
      pages: [
        {
          pageNumber: 1,
          content: `The Foreign Account Tax Compliance Act enacted as part of the HIRE Act of 2010 requires foreign financial institutions to report information about financial accounts held by U.S. taxpayers or by foreign entities in which U.S. taxpayers hold a substantial ownership interest. FFIs that do not comply are subject to a 30 percent withholding tax on certain U.S. source payments including interest, dividends, and gross proceeds from the sale of securities. FFIs may comply by entering into an agreement with the IRS under which they agree to identify U.S. accounts, report specified information about those accounts, and withhold on payments to non-compliant account holders and non-participating FFIs. Intergovernmental agreements between the United States and foreign governments provide alternative compliance frameworks. Model 1 IGAs require FFIs to report to their local government which then exchanges the information with the IRS. Model 2 IGAs require FFIs to report directly to the IRS with supplemental information provided by the local government.`
        },
        {
          pageNumber: 2,
          content: `U.S. taxpayers with specified foreign financial assets exceeding certain thresholds must report those assets on Form 8938 under Section 6038D. The reporting thresholds for taxpayers living in the United States are 50,000 dollars at the end of the year or 75,000 dollars at any time during the year for unmarried individuals with higher thresholds for married couples filing jointly. These thresholds are higher for U.S. taxpayers living abroad. The reporting requirement applies to financial accounts maintained by foreign financial institutions, stock or securities issued by a non-U.S. person, any financial instrument or contract that has an issuer or counterparty that is not a U.S. person, and any interest in a foreign entity. Failure to report carries penalties of 10,000 dollars with additional penalties of up to 50,000 dollars for continued failure after IRS notification. FATCA operates alongside but does not replace the separate requirement to file a Report of Foreign Bank and Financial Accounts on FinCEN Form 114. The two reporting regimes have different thresholds, different definitions of reportable accounts, and different penalties for noncompliance.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 1471-1474",
        citedDocuments: ["tax-013", "pov-008"]
      }
    },
    {
      id: "act-015",
      title: "Internal Revenue Code Section 751 - Hot Assets in Partnership Distributions",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "1986-10-22",
      source: "26 U.S.C. Section 751",
      pages: [
        {
          pageNumber: 1,
          content: `Section 751 of the Internal Revenue Code addresses the treatment of unrealized receivables and inventory items, collectively known as hot assets, in the context of partnership sales and distributions. When a partner sells or exchanges a partnership interest, the amount realized attributable to the partner's share of unrealized receivables and inventory items is treated as ordinary income rather than capital gain. This prevents partners from converting ordinary income into capital gain through the sale of a partnership interest. Unrealized receivables include the right to payment for goods delivered or services rendered to the extent not previously included in income and certain depreciable property to the extent of potential recapture under Sections 1245 and 1250. Inventory items include not only traditional inventory but also any property that would not be treated as a capital asset or Section 1231 property in the hands of the selling partner.`
        },
        {
          pageNumber: 2,
          content: `Section 751(b) applies to current and liquidating distributions from a partnership where the distribution results in a disproportionate shift of hot assets between the distributing partnership and the distributee partner. If a partner receives more or less than their proportionate share of hot assets in a distribution, the transaction is recharacterized as a deemed exchange between the partner and the partnership. The partner is treated as having exchanged the hot assets for other property or vice versa, and ordinary income or loss is recognized on the deemed exchange of the hot assets. The regulations under Section 751(b) are complex and require a comparison of the partner's interest in hot assets before and after the distribution. The hypothetical sale approach measures each partner's share of hot assets based on what they would receive if the partnership sold all its assets at fair market value. Many practitioners have noted the difficulty of applying these rules in practice, and the IRS has proposed but not finalized simplified regulations.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 751",
        citedDocuments: ["judgment-017", "pov-009"]
      }
    },
    {
      id: "act-016",
      title: "Tax Cuts and Jobs Act of 2017 - Overview of Major Provisions",
      category: "act",
      subcategory: "Tax Reform",
      datePublished: "2017-12-22",
      source: "Pub. L. 115-97",
      pages: [
        {
          pageNumber: 1,
          content: `The Tax Cuts and Jobs Act signed into law on December 22, 2017, represents the most significant overhaul of the federal tax code since the Tax Reform Act of 1986. The Act reduced the corporate tax rate from a graduated structure with a top rate of 35 percent to a flat rate of 21 percent. For individuals, the Act reduced rates across most brackets, nearly doubled the standard deduction, and eliminated personal exemptions. The top individual rate was reduced from 39.6 percent to 37 percent. The individual provisions are scheduled to sunset after December 31, 2025, while the corporate rate reduction is permanent. The Act limited the state and local tax deduction to 10,000 dollars, reduced the mortgage interest deduction cap from one million to 750,000 dollars for new acquisitions, and eliminated the deduction for miscellaneous itemized deductions subject to the 2 percent floor. The child tax credit was doubled to 2,000 dollars per qualifying child with a refundable portion of 1,400 dollars.`
        },
        {
          pageNumber: 2,
          content: `On the international tax side, the Act moved the United States from a worldwide system of taxation to a modified territorial system. Section 245A provides a 100 percent dividends received deduction for the foreign source portion of dividends received from specified 10 percent owned foreign corporations. The transition to the new system included a one-time mandatory repatriation tax on previously untaxed foreign earnings under Section 965 at rates of 15.5 percent for earnings held in cash and 8 percent for earnings held in other assets. The Act introduced the Global Intangible Low-Taxed Income provisions under Section 951A requiring U.S. shareholders to include their share of a controlled foreign corporation's income exceeding a routine return on tangible assets. The Foreign Derived Intangible Income deduction under Section 250 provides a reduced effective rate on income from serving foreign markets. The Base Erosion and Anti-Abuse Tax under Section 59A imposes a minimum tax on large corporations that make significant deductible payments to foreign related parties.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-007", "act-004", "pov-010"]
      }
    },
    {
      id: "act-017",
      title: "Internal Revenue Code Section 1221 - Capital Asset Definition",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "1986-10-22",
      source: "26 U.S.C. Section 1221",
      pages: [
        {
          pageNumber: 1,
          content: `Section 1221 defines a capital asset as property held by the taxpayer whether or not connected with a trade or business, with specific exclusions. The definition operates by exclusion rather than inclusion, meaning all property is a capital asset unless it falls within one of the statutory exceptions. The exceptions include inventory or property held primarily for sale to customers in the ordinary course of business, depreciable property used in a trade or business, real property used in a trade or business, accounts receivable acquired in the ordinary course, certain government publications, commodities derivative financial instruments held by commodities dealers, hedging transactions, and supplies regularly consumed in the ordinary course of business. The distinction between capital and ordinary assets matters because net long-term capital gains of individuals are taxed at preferential rates of 0, 15, or 20 percent depending on the taxpayer's regular income bracket, while ordinary income is taxed at rates up to 37 percent.`
        },
        {
          pageNumber: 2,
          content: `The determination of whether property is held primarily for sale to customers in the ordinary course of business is one of the most frequently litigated issues in tax law. Courts apply a multifactor test examining the taxpayer's purpose for holding the property, the frequency and continuity of sales, the extent of development and improvement activities, the duration of ownership, the nature and extent of selling efforts, and the percentage of income derived from sales. The Supreme Court's decision in Malat v. Riddell (1966) clarified that primarily means of first importance or principally. Real estate developers and dealers face particular difficulty distinguishing between properties held for sale as inventory and properties held for investment. Section 1231 provides a favorable hybrid treatment for depreciable business property and business real property held for more than one year, allowing net gains to be taxed at capital gain rates while net losses receive ordinary treatment. The lookback rule under Section 1231(c) recaptures prior net Section 1231 losses by treating current net gains as ordinary income.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 1221",
        citedDocuments: ["judgment-018", "tax-014"]
      }
    },
    {
      id: "act-018",
      title: "Dodd-Frank Wall Street Reform and Consumer Protection Act",
      category: "act",
      subcategory: "Financial Regulation",
      datePublished: "2010-07-21",
      source: "Pub. L. 111-203",
      pages: [
        {
          pageNumber: 1,
          content: `The Dodd-Frank Act enacted in 2010 in response to the financial crisis of 2007 to 2008 established comprehensive reforms to the regulation of financial markets and institutions. Title I created the Financial Stability Oversight Council tasked with identifying risks to the financial stability of the United States and promoting market discipline. The FSOC has the authority to designate nonbank financial companies as systemically important, subjecting them to enhanced prudential standards and Federal Reserve supervision. Title II established the Orderly Liquidation Authority providing a mechanism for the orderly resolution of failing financial companies whose failure would have serious adverse effects on financial stability. The Volcker Rule under Section 619 generally prohibits banking entities from engaging in proprietary trading and from owning or sponsoring hedge funds or private equity funds. Permitted activities include market making, underwriting, and risk-mitigating hedging.`
        },
        {
          pageNumber: 2,
          content: `Title VII of the Dodd-Frank Act brought the previously unregulated over-the-counter derivatives market under federal oversight. The Act requires standardized derivatives to be cleared through registered clearinghouses and traded on exchanges or swap execution facilities. Swap dealers and major swap participants must register with the CFTC or SEC and are subject to capital, margin, reporting, recordkeeping, and business conduct requirements. Title X created the Consumer Financial Protection Bureau as an independent bureau within the Federal Reserve System with authority to regulate consumer financial products and services. The CFPB has rulemaking, supervisory, and enforcement authority over providers of consumer financial products. Title XIV established new standards for residential mortgage lending including ability to repay requirements and qualified mortgage standards. Lenders must make a reasonable and good faith determination that the borrower has the ability to repay the loan based on verified income, assets, and obligations. Qualified mortgages that meet specified underwriting criteria receive a legal safe harbor or rebuttable presumption of compliance.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["judgment-019", "pov-011"]
      }
    },
    {
      id: "act-019",
      title: "Internal Revenue Code Section 704(b) - Partner's Distributive Share",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "1986-10-22",
      source: "26 U.S.C. Section 704(b)",
      pages: [
        {
          pageNumber: 1,
          content: `Section 704(b) provides that a partner's distributive share of income, gain, loss, deduction, or credit is determined by the partnership agreement unless the allocation lacks substantial economic effect. The regulations under Section 704(b) establish a three-part test for substantial economic effect. First, allocations must have economic effect, which requires that the partnership agreement provide for the maintenance of capital accounts in accordance with the regulations, that liquidating distributions be made in accordance with positive capital account balances, and that any partner with a deficit capital account after liquidation be unconditionally obligated to restore that deficit. Second, the economic effect must be substantial, meaning there must be a reasonable possibility that the allocation will affect the dollar amounts to be received by the partners independently of tax consequences. An allocation lacks substantiality if at the time the allocation becomes part of the partnership agreement the after-tax economic consequences of at least one partner may be enhanced compared to what they would have been without the allocation and there is a strong likelihood that no partner will be diminished.`
        },
        {
          pageNumber: 2,
          content: `If an allocation does not have substantial economic effect, the partner's distributive share is determined in accordance with the partner's interest in the partnership. The partner's interest in the partnership is determined by taking into account all facts and circumstances including the partners' relative contributions, the interests of the partners in economic profits and losses, the interests of the partners in cash flow, and the rights of the partners to distributions of capital on liquidation. The alternate test for economic effect under the regulations requires capital account maintenance and liquidation in accordance with capital accounts, but instead of a deficit restoration obligation, the partnership agreement must contain a qualified income offset provision. A qualified income offset requires that a partner who unexpectedly receives an adjustment, allocation, or distribution that creates a negative capital account balance be allocated items of income and gain sufficient to eliminate the deficit as quickly as possible. The safe harbor provisions under the Section 704(b) regulations provide certainty for partnership allocations that comply with the detailed requirements.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 704(b)",
        citedDocuments: ["judgment-020", "pov-012"]
      }
    },
    {
      id: "act-020",
      title: "Internal Revenue Code Section 351 - Transfer to Controlled Corporation",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "1986-10-22",
      source: "26 U.S.C. Section 351",
      pages: [
        {
          pageNumber: 1,
          content: `Section 351 provides that no gain or loss is recognized when property is transferred to a corporation by one or more persons solely in exchange for stock of the corporation, and immediately after the exchange the transferors are in control of the corporation. Control is defined under Section 368(c) as ownership of stock possessing at least 80 percent of the total combined voting power of all classes of stock entitled to vote and at least 80 percent of the total number of shares of all other classes of stock. The policy rationale for Section 351 is similar to that underlying Section 1031: the transferor's investment has merely changed form from direct ownership of assets to indirect ownership through corporate stock, and no economic gain has been realized in a way that provides funds to pay tax. The transferor's basis in the stock received equals the basis of the property transferred, decreased by any money received and increased by any gain recognized. The corporation's basis in the property received equals the transferor's basis increased by any gain recognized by the transferor.`
        },
        {
          pageNumber: 2,
          content: `If the transferor receives boot in addition to stock, gain is recognized to the extent of the lesser of the fair market value of the boot received or the realized gain. Boot includes money, short-term debt obligations, and any non-qualifying property received in the exchange. Securities of the corporation may be received tax-free only to the extent their principal amount does not exceed the principal amount of securities surrendered. The assumption of liabilities by the corporation is generally not treated as boot under Section 357(a). However, if the principal purpose of the liability assumption is tax avoidance or if there is no bona fide business purpose, the total amount of liabilities assumed is treated as boot under Section 357(b). Additionally, under Section 357(c), if the total liabilities assumed exceed the total adjusted basis of the property transferred, the excess is recognized as gain. The assignment of income doctrine may apply to prevent taxpayers from using Section 351 to assign earned income to a controlled corporation.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 351",
        citedDocuments: ["judgment-021", "tax-015"]
      }
    },
    {
      id: "act-021",
      title: "Americans with Disabilities Act - Title III Public Accommodations",
      category: "act",
      subcategory: "Civil Rights",
      datePublished: "1990-07-26",
      source: "42 U.S.C. Sections 12181-12189",
      pages: [
        {
          pageNumber: 1,
          content: `Title III of the Americans with Disabilities Act prohibits discrimination on the basis of disability in places of public accommodation and requires newly constructed and altered commercial facilities to be accessible. Public accommodations include hotels, restaurants, theaters, retail stores, banks, hospitals, professional offices, educational institutions, and other establishments open to the public. The Act requires the removal of architectural barriers in existing facilities where such removal is readily achievable, meaning easily accomplishable and able to be carried out without much difficulty or expense. Factors in determining readily achievable include the nature and cost of the action, the overall financial resources of the facility and the entity, and the type of operation. When barrier removal is not readily achievable, the entity must provide services through alternative methods if such methods are readily achievable. The Act also prohibits discrimination in the provision of goods, services, facilities, privileges, advantages, and accommodations. Reasonable modifications in policies, practices, and procedures must be made unless the entity can demonstrate that the modification would fundamentally alter the nature of the service.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["judgment-022"]
      }
    },
    {
      id: "act-022",
      title: "Internal Revenue Code Section 280A - Home Office Deduction",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "1986-10-22",
      source: "26 U.S.C. Section 280A",
      pages: [
        {
          pageNumber: 1,
          content: `Section 280A generally disallows deductions related to the use of a dwelling unit used by the taxpayer during the taxable year as a residence. However, deductions are allowed for the portion of the dwelling used exclusively and regularly as the principal place of business for any trade or business of the taxpayer, as a place of business used by patients, clients, or customers in meeting or dealing with the taxpayer in the normal course of business, or in connection with a separate structure not attached to the dwelling used in connection with the taxpayer's trade or business. The exclusive use requirement means the space must be used solely for business and not for any personal purpose. The regular use requirement means the use must be ongoing and not merely occasional. The Taxpayer Relief Act of 1997 expanded the definition of principal place of business to include a home office used for administrative or management activities if there is no other fixed location where the taxpayer conducts substantial administrative or management activities. The simplified method introduced by the IRS allows a deduction of five dollars per square foot of home used for business up to a maximum of 300 square feet.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 280A",
        citedDocuments: ["judgment-023", "tax-016"]
      }
    },
    {
      id: "act-023",
      title: "Bankruptcy Code Chapter 11 - Reorganization",
      category: "act",
      subcategory: "Bankruptcy Law",
      datePublished: "1978-11-06",
      source: "11 U.S.C. Sections 1101-1174",
      pages: [
        {
          pageNumber: 1,
          content: `Chapter 11 of the Bankruptcy Code provides a mechanism for businesses to reorganize their debts while continuing operations. Upon filing a Chapter 11 petition, an automatic stay under Section 362 immediately halts all collection efforts, foreclosures, and litigation against the debtor. The debtor typically remains in possession of its assets and continues to operate the business as a debtor in possession with the powers and duties of a trustee. The debtor in possession has the exclusive right to propose a plan of reorganization during the first 120 days after the order for relief, extendable to 18 months by the court. The plan must classify claims and interests, specify the treatment of each class, and provide adequate means for implementation. A plan is confirmed if it is accepted by each class of claims and interests. Acceptance requires approval by creditors holding at least two-thirds in amount and more than one-half in number of the allowed claims in each class that votes. The court may confirm a plan over the objection of a dissenting class through the cramdown provisions of Section 1129(b) if the plan does not discriminate unfairly and is fair and equitable with respect to the dissenting class.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["judgment-024", "pov-013"]
      }
    },
    {
      id: "act-024",
      title: "Internal Revenue Code Section 6662 - Accuracy-Related Penalties",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "1986-10-22",
      source: "26 U.S.C. Section 6662",
      pages: [
        {
          pageNumber: 1,
          content: `Section 6662 imposes a penalty equal to 20 percent of the portion of an underpayment attributable to negligence or disregard of rules or regulations, any substantial understatement of income tax, any substantial valuation misstatement, any substantial overstatement of pension liabilities, any substantial estate or gift tax valuation understatement, or any disallowance of claimed tax benefits by reason of a transaction lacking economic substance. A substantial understatement of income tax exists when the understatement exceeds the greater of 10 percent of the tax required to be shown on the return or 5,000 dollars. For corporations other than S corporations, the threshold is the lesser of 10 percent of the tax or 10 million dollars. The understatement is reduced by the amount attributable to the tax treatment of an item for which there is substantial authority or for which the relevant facts were adequately disclosed on the return. The substantial authority standard is an objective test that examines the weight of legal authorities supporting the taxpayer's position. It is a higher standard than the reasonable basis standard but lower than the more likely than not standard.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        ircSection: "26 U.S.C. 6662",
        citedDocuments: ["judgment-025", "tax-017"]
      }
    },
    {
      id: "act-025",
      title: "SECURE 2.0 Act of 2022 - Retirement Savings Enhancements",
      category: "act",
      subcategory: "Tax Code",
      datePublished: "2022-12-29",
      source: "Pub. L. 117-328, Division T",
      pages: [
        {
          pageNumber: 1,
          content: `The SECURE 2.0 Act of 2022 builds on the Setting Every Community Up for Retirement Enhancement Act of 2019 and introduces significant changes to retirement savings provisions. The Act increases the required minimum distribution age from 72 to 73 beginning in 2023 and to 75 beginning in 2033. It reduces the excise tax penalty for failing to take required minimum distributions from 50 percent to 25 percent with a further reduction to 10 percent if corrected within a specified period. The Act requires new 401(k) and 403(b) plans established after December 29, 2022, to automatically enroll eligible employees at a contribution rate of at least 3 percent but not more than 10 percent with automatic annual escalation of 1 percent per year up to at least 10 percent but not more than 15 percent. Employees may opt out. The Act creates a new employer matching or nonelective contribution Roth option allowing participants to designate employer contributions as Roth contributions. It also permits the rollover of unused 529 plan assets to a Roth IRA of the beneficiary subject to certain conditions including that the 529 account must have been maintained for at least 15 years and annual rollovers are subject to the Roth IRA contribution limits with a lifetime maximum of 35,000 dollars.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-006", "tax-018"]
      }
    }
  ];
  return acts;
}

function generateJudgments(): LegalDocument[] {
  const judgments: LegalDocument[] = [
    {
      id: "judgment-001",
      title: "Commissioner v. Glenshaw Glass Co., 348 U.S. 426 (1955)",
      category: "judgment",
      subcategory: "Tax - Income Definition",
      datePublished: "1955-03-07",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `Commissioner v. Glenshaw Glass Co., 348 U.S. 426 (1955). Chief Justice Warren delivered the opinion of the Court. The question was whether money received as exemplary damages for fraud or as the punitive two-thirds portion of a treble-damage antitrust recovery must be reported as gross income under Sec. 22(a) of the Internal Revenue Code of 1939. Glenshaw Glass settled litigation against Hartford-Empire Co. for approximately $800,000. Of this amount, $324,529.94 represented punitive damages for fraud and antitrust violations. Goldman Theatres won a treble-damage antitrust judgment of $375,000 against Loew's, Inc. (based on $125,000 actual damages). Neither taxpayer reported the punitive portions as income. The Tax Court and the Court of Appeals for the Third Circuit ruled in favor of the taxpayers. Reversed. The Court held that Sec. 22(a) was broad enough to include these amounts, stating that Congress applied "no limitations as to the source of taxable receipts, nor restrictive labels as to their nature" and intended to exert "the full measure of its taxing power." Id. at 429-30.`
        },
        {
          pageNumber: 2,
          content: `The Court defined the reach of Sec. 22(a) as encompassing "undeniable accessions to wealth, clearly realized, and over which the taxpayers have complete dominion." 348 U.S. at 431. The Court distinguished Eisner v. Macomber, 252 U.S. 189 (1920), which had defined income as "the gain derived from capital, from labor, or from both combined," noting that this formulation "was not meant to provide a touchstone to all future gross income questions." 348 U.S. at 431. The Court rejected the taxpayers' argument that punitive damages are a "windfall" falling outside the tax base, finding no Congressional intent to exempt such receipts. The Commissioner had promptly issued nonacquiescence in the Board of Tax Appeals' contrary ruling in Highland Farms Corp., 42 B.T.A. 1314 (1940). Justice Douglas dissented without opinion. The decision resolved a circuit split and established the standard applied in subsequent cases including James v. United States, 366 U.S. 213 (1961) (embezzled funds); Cesarini v. United States, 296 F. Supp. 3 (N.D. Ohio 1969) (treasure trove); and Rev. Rul. 2019-24, 2019-44 I.R.B. 1004 (cryptocurrency hard forks).`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "348 U.S. 426",
        citedDocuments: ["act-001"]
      }
    },
    {
      id: "judgment-002",
      title: "Chevron U.S.A. v. Natural Resources Defense Council, 467 U.S. 837 (1984)",
      category: "judgment",
      subcategory: "Administrative Law",
      datePublished: "1984-06-25",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `Chevron U.S.A., Inc. v. Natural Resources Defense Council, Inc., 467 U.S. 837 (1984). Justice Stevens delivered the opinion of the Court. The case concerned the EPA's interpretation of the term "stationary source" under the Clean Air Act Amendments of 1977 to allow a plantwide "bubble concept." The Court established a two-step framework for judicial review of agency statutory interpretation. Step One: "First, always, is the question whether Congress has directly spoken to the precise question at issue. If the intent of Congress is clear, that is the end of the matter; for the court, as well as the agency, must give effect to the unambiguously expressed intent of Congress." 467 U.S. at 842-43. Step Two: If Congress has not directly addressed the precise question, "the question for the court is whether the agency's answer is based on a permissible construction of the statute." Id. at 843. The Court emphasized that "considerable weight should be accorded to an executive department's construction of a statutory scheme it is entrusted to administer." Id. at 844.`
        },
        {
          pageNumber: 2,
          content: `Justice Stevens reasoned that judges "are not experts in the field, and are not part of either political branch of the Government." 467 U.S. at 865. When an agency's interpretation "represents a reasonable accommodation of manifestly competing interests" it is "entitled to deference." Id. at 865. In the tax context, Chevron deference applied to Treasury regulations issued under notice-and-comment rulemaking. See Mayo Foundation for Medical Education and Research v. United States, 562 U.S. 44 (2011). Revenue rulings and other informal guidance received lesser Skidmore deference, measured by "the thoroughness evident in its consideration, the validity of its reasoning, its consistency with earlier and later pronouncements, and all those factors which give it power to persuade." Skidmore v. Swift & Co., 323 U.S. 134, 140 (1944). However, in Loper Bright Enterprises v. Raimondo, 144 S. Ct. 2244 (2024), the Supreme Court overruled Chevron, holding that courts must exercise independent judgment in determining the best reading of a statute under the Administrative Procedure Act, 5 U.S.C. Sec. 706. This decision ended four decades of mandatory judicial deference to agency statutory interpretation and has substantial implications for challenges to Treasury regulations and IRS guidance.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "467 U.S. 837",
        citedDocuments: ["pov-001"]
      }
    },
    {
      id: "judgment-003",
      title: "Commissioner v. Banks, 543 U.S. 426 (2005)",
      category: "judgment",
      subcategory: "Tax - Attorney Fees",
      datePublished: "2005-01-24",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `Commissioner v. Banks, 543 U.S. 426 (2005). Justice Kennedy delivered the opinion of the Court (8-0; Chief Justice Rehnquist took no part). The Court consolidated two cases. Banks settled a federal employment discrimination suit for $464,000; paid his attorney $150,000 under a contingent-fee agreement; did not report that portion as income. Banaitis settled a state tort claim; defendants paid $4,864,547 to the client and $3,864,012 directly to the attorney. Held: "When a litigant's recovery constitutes income, the litigant's income includes the portion of the recovery paid to the attorney as a contingent fee." Id. at 430. The Court applied the anticipatory assignment of income doctrine rooted in Lucas v. Earl, 281 U.S. 111 (1930), which provides that "gains should be taxed to those who earn them." The relevant inquiry is whether the taxpayer "retains dominion over the income-generating asset," not whether the taxpayer possesses immediate dominion over the payment. Id. at 434. Kennedy characterized the contingent-fee relationship as "a quintessential principal-agent relationship" rather than a partnership. Id. at 436.`
        },
        {
          pageNumber: 2,
          content: `Justice Kennedy rejected the contention that the attorney's effort and risk-bearing convert the relationship into a joint venture: "The attorney is an agent who is duty bound to act only in the interests of the principal, and so it is appropriate to treat the full amount of the recovery as income to the principal." 543 U.S. at 437. The Court noted that the alternative minimum tax under Sec. 55 exacerbated the hardship because miscellaneous itemized deductions (including attorney fees) were not deductible for AMT purposes. Congress partially addressed this problem by enacting Sec. 62(a)(20) in the American Jobs Creation Act of 2004, Pub. L. 108-357, Sec. 703, allowing an above-the-line deduction for attorney fees in discrimination and certain whistleblower cases, limited to the amount includible in gross income. This provision does not cover all types of litigation. See also Baylin v. United States, 43 F.3d 1451 (Fed. Cir. 1995). The Court declined to fully address whether the holding applies to court-awarded fees under federal fee-shifting statutes such as 42 U.S.C. Sec. 1988, noting Banks had settled under a private contingent agreement with no court-ordered fee component.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "543 U.S. 426",
        citedDocuments: ["act-001", "act-002"]
      }
    },
    {
      id: "judgment-004",
      title: "Welch v. Helvering, 290 U.S. 111 (1933)",
      category: "judgment",
      subcategory: "Tax - Business Expenses",
      datePublished: "1933-11-06",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `Welch v. Helvering, 290 U.S. 111 (1933). Justice Cardozo delivered the opinion. Petitioner Thomas Welch was a grain commission agent whose employer, E.L. Welch Company, went through bankruptcy. After the discharge, Welch began his own business and voluntarily paid the debts of the former company to re-establish relationships with its customers. He deducted these payments as ordinary and necessary business expenses. The Board of Tax Appeals and the Court of Appeals for the Eighth Circuit disallowed the deduction. Affirmed. Cardozo wrote: "One struggles in vain for any verbal formula that will supply a ready touchstone. The standard set up by the statute is not a rule of law; it is rather a way of life. Life in all its fullness must supply the answer to the riddle." 290 U.S. at 115. The Court held that while the payments were "necessary" in the sense of being "appropriate and helpful," they were not "ordinary" because business people do not typically pay the debts of others "ordinarily, though not even though the result might be to heighten their reputation for generosity and opulence." Id. at 113-14.`
        },
        {
          pageNumber: 2,
          content: `Cardozo distinguished "ordinary" from "necessary" and treated the payments as capital expenditures producing future benefits in the form of "reputation and learning" akin to goodwill. 290 U.S. at 115-16. The "ordinary" test requires conformity to "the ways of conduct and the forms of speech prevailing in the business world." Id. at 113. An expense may be ordinary even if the particular taxpayer incurs it only once, provided it is the type of expenditure commonly made by others in that trade. Deputy v. du Pont, 308 U.S. 488, 495 (1940). Cardozo emphasized that "[t]he burden is on the taxpayer to bring his case within the terms of the deduction." 290 U.S. at 115. The decision also established that deductions are "a matter of legislative grace" rather than constitutional right. See also New Colonial Ice Co. v. Helvering, 292 U.S. 435, 440 (1934). The multi-factor analysis in Welch remains foundational for Sec. 162 disputes and is regularly cited by the Tax Court in characterizing expenditures as ordinary business expenses or nondeductible capital outlays. See INDOPCO Inc. v. Commissioner, 503 U.S. 79 (1992).`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "290 U.S. 111",
        citedDocuments: ["act-002"]
      }
    },
    {
      id: "judgment-005",
      title: "INDOPCO Inc. v. Commissioner, 503 U.S. 79 (1992)",
      category: "judgment",
      subcategory: "Tax - Capital vs. Ordinary",
      datePublished: "1992-02-26",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `In INDOPCO Inc. v. Commissioner, the Supreme Court addressed whether investment banking fees and legal costs incurred by a target corporation in connection with a friendly takeover were deductible business expenses or nondeductible capital expenditures. The taxpayer argued that the expenses were ordinary and necessary business expenses because the company did not initiate the takeover and the expenses were incurred to evaluate and respond to the acquirer's offer. The Court held that the expenses were capital in nature because they produced significant long-term benefits for the corporation. The Court rejected the taxpayer's argument that a separate and distinct asset must be created for an expenditure to be capitalized. Instead, the Court held that the creation of a separate asset is sufficient but not necessary for capitalization. The long-term benefits of the acquisition, including synergies from the combination and access to the acquirer's resources, required capitalization of the associated costs.`
        },
        {
          pageNumber: 2,
          content: `The INDOPCO decision generated significant uncertainty about the scope of the capitalization requirement because the future benefit test appeared to require capitalization of many ordinary business expenses that incidentally produce some long-term benefit. In response, the IRS issued regulations under Section 263 and 263A that provide more specific guidance on the capitalization of costs incurred in acquiring, creating, and enhancing intangible assets. The regulations establish a 12-month rule under which a taxpayer is not required to capitalize amounts paid to create or enhance a right or benefit that does not extend beyond the earlier of 12 months after the date the right or benefit is first realized or the end of the taxable year following the year in which payment is made. The regulations also address transaction costs in business acquisitions and reorganizations, facilitating costs for tax-free reorganizations, and costs of defending or perfecting title to property. The regulatory framework clarified many of the issues raised by INDOPCO while preserving the general principle that expenditures creating long-term benefits must be capitalized.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "503 U.S. 79",
        citedDocuments: ["act-002", "act-017"]
      }
    },
    {
      id: "judgment-006",
      title: "Bob Jones University v. United States, 461 U.S. 574 (1983)",
      category: "judgment",
      subcategory: "Tax - Exempt Organizations",
      datePublished: "1983-05-24",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `In Bob Jones University v. United States, the Supreme Court upheld the IRS decision to revoke the tax-exempt status of Bob Jones University because the university's racially discriminatory admissions policy violated established public policy. The university argued that it qualified for exemption under Section 501(c)(3) because it was organized and operated exclusively for educational purposes and that the IRS lacked authority to impose a public policy requirement not found in the statute. The Court disagreed, holding that the common law concept of charity underlying Section 501(c)(3) requires that an organization's purposes not be illegal or contrary to established public policy. The Court traced the development of the law of charitable trusts and concluded that an institution seeking tax-exempt status must serve a public purpose and must not act in a manner that contravenes fundamental national policy. The elimination of racial discrimination in education was held to be such a fundamental policy based on the passage of civil rights legislation and the consistent judicial condemnation of racial discrimination.`
        },
        {
          pageNumber: 2,
          content: `The Bob Jones University decision established the principle that tax-exempt status carries with it an implicit requirement that the organization not violate established public policy. The Court emphasized that entitlement to tax exemption depends on meeting certain common law standards of charity, specifically that the organization must demonstrably serve and be in harmony with the public interest and that the purpose of the organization must not be so at odds with the common community conscience as to undermine any public benefit that might otherwise be conferred. The decision has been cited in various contexts where taxpayers have argued that the IRS has exceeded its authority in imposing requirements not explicitly stated in the Code. Critics have argued that the public policy doctrine gives the IRS excessive discretion to determine which policies are sufficiently fundamental and established to justify denial of exemption. Supporters respond that the doctrine is necessary to prevent the tax system from subsidizing activities that undermine clearly established national policies. The scope of the public policy doctrine remains debated and has not been significantly expanded beyond the racial discrimination context.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "461 U.S. 574",
        citedDocuments: ["act-003"]
      }
    },
    {
      id: "judgment-007",
      title: "Starker v. United States, 602 F.2d 1341 (9th Cir. 1979)",
      category: "judgment",
      subcategory: "Tax - Like-Kind Exchanges",
      datePublished: "1979-07-16",
      source: "United States Court of Appeals, Ninth Circuit",
      pages: [
        {
          pageNumber: 1,
          content: `In Starker v. United States, the Ninth Circuit Court of Appeals addressed whether a nonsimultaneous exchange of properties could qualify for nonrecognition treatment under the predecessor of Section 1031. The taxpayer transferred timber land to a corporation in exchange for the corporation's promise to locate and transfer suitable replacement properties within five years. The IRS argued that a like-kind exchange required simultaneous transfer of properties and that the transaction was a sale followed by a purchase. The Ninth Circuit disagreed, holding that Section 1031 does not require simultaneity and that a nonsimultaneous exchange qualifies for nonrecognition treatment if the transaction is structured as an exchange rather than a sale and purchase. The court applied a substance over form analysis and concluded that the parties intended and structured the transaction as an exchange. The receipt of the corporation's contractual obligation to deliver replacement property was treated as the receipt of like-kind property.`
        },
        {
          pageNumber: 2,
          content: `The Starker decision opened the door to deferred like-kind exchanges and prompted Congress to enact specific rules governing such transactions. In 1984, Congress added the identification and receipt requirements to Section 1031. The taxpayer must identify replacement property within 45 days of transferring the relinquished property and must receive the replacement property within 180 days or by the due date of the tax return including extensions. These time limitations represent a legislative compromise between the IRS position requiring simultaneity and the broad holding of Starker permitting exchanges over extended periods. The use of qualified intermediaries, which developed after Starker and was sanctioned by the regulations, has made deferred exchanges the predominant form of like-kind exchange in practice. The Starker case remains a landmark decision in tax law for establishing the principle that an exchange need not be simultaneous and for demonstrating how judicial interpretation can shape the practical application of tax provisions in ways that Congress then refines through legislation.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "U.S. Court of Appeals, Ninth Circuit",
        caseNumber: "602 F.2d 1341",
        citedDocuments: ["act-004"]
      }
    },
    {
      id: "judgment-008",
      title: "Hernandez v. Commissioner, 490 U.S. 680 (1989)",
      category: "judgment",
      subcategory: "Tax - Charitable Contributions",
      datePublished: "1989-06-05",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `In Hernandez v. Commissioner, the Supreme Court addressed whether payments made to the Church of Scientology for auditing and training sessions were deductible as charitable contributions under Section 170. The Court held that the payments were not deductible because they were made in exchange for a specific service, namely the auditing and training sessions, and therefore lacked the necessary donative intent. The Court applied a quid pro quo analysis, determining that the taxpayers received an identifiable benefit roughly proportional to their payments. The fact that the payments were made to a tax-exempt religious organization did not convert what was essentially a purchase of services into a charitable contribution. The Court rejected the argument that the religious nature of the benefit received required a different analysis, holding that the charitable contribution deduction requires a payment made with no expectation of receiving a commensurate benefit in return, regardless of whether the benefit is secular or religious in nature.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "490 U.S. 680",
        citedDocuments: ["act-005"]
      }
    },
    {
      id: "judgment-009",
      title: "Altera Corp. v. Commissioner, 941 F.3d 1200 (9th Cir. 2019)",
      category: "judgment",
      subcategory: "Tax - Transfer Pricing",
      datePublished: "2019-06-07",
      source: "United States Court of Appeals, Ninth Circuit",
      pages: [
        {
          pageNumber: 1,
          content: `In Altera Corp. v. Commissioner, the Ninth Circuit Court of Appeals addressed whether Treasury regulations requiring related parties to include stock-based compensation costs in qualified cost sharing arrangements were valid. The Tax Court had invalidated the regulations, finding that Treasury failed to adequately respond to comments received during the rulemaking process and that the arm's length standard required evidence that unrelated parties would share such costs. The Ninth Circuit reversed, holding that the regulations were a reasonable interpretation of Section 482 and that Treasury had adequately explained its reasoning. The court applied Chevron deference, finding that the statute was ambiguous regarding whether stock-based compensation must be shared in cost sharing arrangements and that Treasury's interpretation was permissible. The court held that Treasury was not required to find evidence that unrelated parties actually share stock-based compensation costs because the purpose of cost sharing regulations is to approximate arm's length results in a controlled context where direct comparables may not exist.`
        },
        {
          pageNumber: 2,
          content: `The Altera decision has significant implications for multinational technology companies that use cost sharing arrangements to develop and exploit intellectual property through related foreign subsidiaries. By requiring the inclusion of stock-based compensation in shared costs, the regulations increase the costs allocated to the foreign participant and reduce the income shifted offshore. The case also illustrates the tension between the arm's length standard, which looks to comparable transactions between unrelated parties, and the reality that many controlled transactions have no true uncontrolled comparables. The decision was closely watched by the transfer pricing community and generated multiple amicus briefs. The Supreme Court denied certiorari in 2020. The ongoing validity of the reasoning in Altera may be affected by the Supreme Court's subsequent decision in Loper Bright overruling Chevron deference, as the Ninth Circuit's analysis relied heavily on the Chevron framework. Future challenges to cost sharing regulations may proceed under a different standard of judicial review.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "U.S. Court of Appeals, Ninth Circuit",
        caseNumber: "941 F.3d 1200",
        citedDocuments: ["act-008", "judgment-002"]
      }
    },
    {
      id: "judgment-010",
      title: "Coca-Cola Co. v. Commissioner, T.C. Memo 2020-163",
      category: "judgment",
      subcategory: "Tax - Transfer Pricing",
      datePublished: "2020-11-18",
      source: "United States Tax Court",
      pages: [
        {
          pageNumber: 1,
          content: `In Coca-Cola Co. v. Commissioner, the Tax Court addressed the IRS determination that Coca-Cola had underreported its income for tax years 2007 through 2009 by approximately 9.4 billion dollars through its transfer pricing arrangements with foreign manufacturing affiliates. The IRS applied the comparable profits method under Section 482 to reallocate income from Coca-Cola's foreign supply points to the U.S. parent. Coca-Cola argued that its transfer pricing followed a methodology agreed upon with the IRS through a closing agreement covering earlier years and that the IRS was bound by this prior agreement. The Tax Court rejected this argument, holding that the closing agreement covered specific tax years and did not bind the IRS to accept the same methodology for subsequent years. The court found that the IRS had properly applied the comparable profits method and that the resulting allocations more accurately reflected arm's length results than the taxpayer's methodology.`
        },
        {
          pageNumber: 2,
          content: `The Coca-Cola decision involved one of the largest transfer pricing adjustments in history and highlighted the risks faced by multinational corporations in structuring intercompany transactions. The case demonstrated that prior informal agreements with the IRS regarding transfer pricing methodology do not prevent the IRS from applying different methods in subsequent years if circumstances change or if the IRS determines that a different method better reflects arm's length results. The decision also illustrated the practical challenges of applying the arm's length standard to unique intangible assets like the Coca-Cola brand and formula where truly comparable uncontrolled transactions do not exist. The case underscored the importance of maintaining contemporaneous documentation supporting the transfer pricing methodology and of regularly reviewing and updating transfer pricing policies to reflect changes in business operations and economic conditions. The magnitude of the adjustment and resulting tax deficiency, along with potential penalties, serves as a cautionary example for companies relying on historical IRS acceptance of their transfer pricing methods.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "United States Tax Court",
        caseNumber: "T.C. Memo 2020-163",
        citedDocuments: ["act-008"]
      }
    },
    {
      id: "judgment-011",
      title: "Basic Inc. v. Levinson, 485 U.S. 224 (1988)",
      category: "judgment",
      subcategory: "Securities Law",
      datePublished: "1988-03-07",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `In Basic Inc. v. Levinson, the Supreme Court addressed the materiality standard for securities fraud claims under Rule 10b-5 in the context of merger negotiations and adopted the fraud-on-the-market theory for establishing reliance. On materiality, the Court adopted the probability-magnitude test from TSC Industries v. Northway, holding that a fact is material if there is a substantial likelihood that a reasonable shareholder would consider it important in making an investment decision. For preliminary merger negotiations, the Court rejected both the agreement-in-principle test, which would require materiality only after the parties reach a tentative agreement, and a bright-line test based on specific events. Instead, the Court adopted a fact-specific approach requiring courts to assess both the probability that the transaction will occur and the significance of the transaction to the company. This balancing approach recognizes that information about possible future events can be material even at early stages if the potential transaction is sufficiently significant.`
        },
        {
          pageNumber: 2,
          content: `The fraud-on-the-market theory adopted in Basic is based on the efficient capital markets hypothesis, which posits that in an open and developed securities market the price of a security reflects all publicly available information about the issuer. Under this theory, investors who purchase or sell securities in an efficient market are entitled to a rebuttable presumption that they relied on the integrity of the market price, which in turn reflected any material misrepresentations. This presumption of reliance is critical to the maintenance of securities fraud class actions because without it each class member would need to prove individual reliance, making class treatment impractical. The presumption may be rebutted by showing that the alleged misrepresentation did not affect the market price or that the plaintiff would have traded despite knowing of the misrepresentation. The Supreme Court reaffirmed the fraud-on-the-market theory in Halliburton Co. v. Erica P. John Fund in 2014 while holding that defendants may rebut the presumption at the class certification stage by showing a lack of price impact.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "485 U.S. 224",
        citedDocuments: ["act-009"]
      }
    },
    {
      id: "judgment-012",
      title: "United States v. O'Hagan, 521 U.S. 642 (1997)",
      category: "judgment",
      subcategory: "Securities Law - Insider Trading",
      datePublished: "1997-06-25",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `In United States v. O'Hagan, the Supreme Court adopted the misappropriation theory of insider trading liability under Section 10(b) of the Securities Exchange Act and Rule 10b-5. James O'Hagan was a partner at a law firm representing Grand Met PLC in its planned tender offer for Pillsbury Company. O'Hagan purchased Pillsbury stock and call options before the tender offer was publicly announced and made a profit of over 4.3 million dollars. He was not a corporate insider of Pillsbury and had no fiduciary relationship with Pillsbury or its shareholders. The Court held that a person who misappropriates confidential information for securities trading purposes, in breach of a duty of trust and confidence owed to the source of the information, may be held liable for securities fraud. The misappropriation theory addresses the use of confidential information for securities trading by persons who owe a duty to the information's source rather than to the shareholders of the company whose securities are traded.`
        },
        {
          pageNumber: 2,
          content: `The O'Hagan decision resolved a circuit split on the validity of the misappropriation theory and significantly expanded the scope of insider trading liability. Under the classical theory previously recognized by the Court in Chiarella v. United States, liability attached only to corporate insiders who breached a fiduciary duty to the corporation's shareholders by trading on material nonpublic information. The misappropriation theory reaches outsiders who have no relationship with the issuing company but who breach a duty to the source of the information. The Court distinguished the misappropriation theory from the classical theory by noting that the deception is directed at the source of the information rather than at the trading counterparty. O'Hagan deceived his law firm and its client by using their confidential information for personal trading. The Court also held that the SEC had the authority to adopt Rule 14e-3, which prohibits trading on material nonpublic information in connection with tender offers without requiring a showing of a fiduciary duty breach. The combination of the classical theory, the misappropriation theory, and Rule 14e-3 provides a comprehensive framework for insider trading enforcement.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "521 U.S. 642",
        citedDocuments: ["act-009"]
      }
    },
    {
      id: "judgment-013",
      title: "Hughes Aircraft Co. v. Jacobson, 525 U.S. 432 (1999)",
      category: "judgment",
      subcategory: "ERISA - Plan Amendments",
      datePublished: "1999-01-25",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `In Hughes Aircraft Co. v. Jacobson, the Supreme Court addressed whether amendments to a defined benefit pension plan that used surplus assets to fund an early retirement program and a new defined contribution benefit for new employees violated ERISA's fiduciary duty and prohibited transaction provisions. The Court held that the employer acts as a plan sponsor when it amends the plan and is not acting as a fiduciary subject to ERISA's fiduciary standards. The Court distinguished between the employer's roles as plan sponsor and plan fiduciary, noting that ERISA carefully distinguishes between these roles and imposes fiduciary duties only on actions taken in the fiduciary capacity. Amending the plan to change its terms is a settlor function, not a fiduciary function. The Court also held that the surplus assets in a defined benefit plan belong to the plan, not to individual participants, and that the employer has broad authority to use surplus assets for purposes consistent with the plan and ERISA's requirements.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "525 U.S. 432",
        citedDocuments: ["act-010"]
      }
    },
    {
      id: "judgment-014",
      title: "LaRue v. DeWolff, Boberg & Associates, 552 U.S. 248 (2008)",
      category: "judgment",
      subcategory: "ERISA - Individual Claims",
      datePublished: "2008-02-20",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `In LaRue v. DeWolff, Boberg and Associates, the Supreme Court held that ERISA Section 502(a)(2) authorizes individual participants in defined contribution plans to bring claims for breach of fiduciary duty that result in losses to their individual accounts. The lower courts had dismissed the claim, reasoning that Section 502(a)(2) only permits actions for losses to the plan as a whole, not for losses to individual accounts. The Court reversed, recognizing that the nature of defined contribution plans differs fundamentally from defined benefit plans. In a defined contribution plan, each participant has an individual account, and losses caused by fiduciary breaches directly affect the value of that individual account. Unlike defined benefit plans where the employer bears the investment risk and participants receive promised benefits regardless of investment performance, participants in defined contribution plans bear the investment risk. The Court held that a fiduciary breach that diminishes the value of an individual participant's account constitutes a loss to the plan within the meaning of Section 502(a)(2).`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "552 U.S. 248",
        citedDocuments: ["act-010"]
      }
    },
    {
      id: "judgment-015",
      title: "Janus Capital Group v. First Derivative Traders, 564 U.S. 135 (2011)",
      category: "judgment",
      subcategory: "Securities Law - Primary Liability",
      datePublished: "2011-06-13",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `In Janus Capital Group v. First Derivative Traders, the Supreme Court addressed the meaning of make in the context of Rule 10b-5 liability for false statements. The Court held that the maker of a statement is the person or entity with ultimate authority over the statement, including its content and whether and how to communicate it. The case involved allegations that Janus Capital Group, the parent company and investment adviser to Janus mutual funds, made material misrepresentations in the funds' prospectuses about policies to prevent market timing. The Court held that Janus Capital Group did not make the statements in the prospectuses because the prospectuses were filed by and on behalf of the Janus funds, which were separate legal entities with their own boards of trustees. Even though Janus Capital Group may have been significantly involved in preparing the prospectuses, the funds had the ultimate authority over the statements and were therefore the makers. The Court drew an analogy to a speechwriter who drafts remarks for a speaker but is not the maker of the statements delivered by the speaker.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "564 U.S. 135",
        citedDocuments: ["act-009", "act-012"]
      }
    },
    {
      id: "judgment-016",
      title: "Groetzinger v. Commissioner, 480 U.S. 23 (1987)",
      category: "judgment",
      subcategory: "Tax - Trade or Business",
      datePublished: "1987-02-24",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `In Commissioner v. Groetzinger, the Supreme Court addressed whether a full-time gambler was engaged in a trade or business for purposes of the Internal Revenue Code. The taxpayer spent 60 to 80 hours per week for 48 weeks of the year at dog and horse racetracks engaging in pari-mutuel wagering. The IRS argued that gambling could not constitute a trade or business and that the taxpayer's losses were limited by Section 165(d) to the amount of gambling gains. The Court held that the taxpayer was engaged in a trade or business, establishing a facts and circumstances test that looks to whether the taxpayer's activities are pursued full time, in good faith, with regularity, for the production of income, and are not merely a hobby or recreational activity. The Court declined to adopt a rigid definition of trade or business, noting that the term appears in numerous Code sections and that a single definition might not be appropriate in all contexts. The decision established that the determination is based on the intensity, continuity, and regularity of the activity rather than the nature of the activity itself.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "480 U.S. 23",
        citedDocuments: ["act-002", "act-013"]
      }
    },
    {
      id: "judgment-017",
      title: "Ledoux v. Commissioner, T.C. Memo 2007-107",
      category: "judgment",
      subcategory: "Tax - Partnership Hot Assets",
      datePublished: "2007-04-16",
      source: "United States Tax Court",
      pages: [
        {
          pageNumber: 1,
          content: `In Ledoux v. Commissioner, the Tax Court addressed the application of Section 751(a) to the sale of a partnership interest where the partnership held unrealized receivables including potential depreciation recapture. The taxpayer sold his interest in a partnership that owned depreciable real property and reported the entire gain as long-term capital gain. The IRS recharacterized a portion of the gain as ordinary income attributable to the taxpayer's share of the partnership's unrealized receivables, specifically the potential Section 1250 recapture inherent in the partnership's depreciable property. The Tax Court upheld the IRS determination, applying the look-through rule of Section 751(a) which requires the selling partner to treat as ordinary income the portion of the gain attributable to hot assets. The court emphasized that the definition of unrealized receivables under Section 751(c) includes potential depreciation recapture under Sections 1245 and 1250, not merely accounts receivable or rights to payment for goods and services. This expansive definition ensures that depreciation recapture cannot be avoided by selling a partnership interest rather than having the partnership sell the underlying assets directly.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "United States Tax Court",
        caseNumber: "T.C. Memo 2007-107",
        citedDocuments: ["act-015"]
      }
    },
    {
      id: "judgment-018",
      title: "Malat v. Riddell, 383 U.S. 569 (1966)",
      category: "judgment",
      subcategory: "Tax - Capital Asset",
      datePublished: "1966-03-21",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `In Malat v. Riddell, the Supreme Court addressed the meaning of the word primarily in the context of the capital asset exclusion for property held primarily for sale to customers in the ordinary course of business. The taxpayer was a real estate developer who claimed capital gain treatment on the sale of certain properties. The IRS argued that the properties were held primarily for sale and that the gain was ordinary income. The lower court had interpreted primarily to mean substantially and found that the taxpayer held the property for a dual purpose of both development and investment. The Supreme Court reversed, holding that primarily means of first importance or principally, not merely substantially. This interpretation requires a determination of the taxpayer's principal purpose for holding the property at the time of sale. If the primary purpose is sale to customers, the property is not a capital asset. If the primary purpose is investment, the property is a capital asset even if a secondary purpose involves potential sale. The decision requires a factual inquiry into the taxpayer's intent and all relevant circumstances.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "383 U.S. 569",
        citedDocuments: ["act-017"]
      }
    },
    {
      id: "judgment-019",
      title: "Seila Law v. Consumer Financial Protection Bureau, 591 U.S. 197 (2020)",
      category: "judgment",
      subcategory: "Constitutional Law - Agency Structure",
      datePublished: "2020-06-29",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `In Seila Law v. Consumer Financial Protection Bureau, the Supreme Court held that the structure of the Consumer Financial Protection Bureau violated the separation of powers because the CFPB was headed by a single director removable only for cause. The Court distinguished the CFPB from multi-member independent agencies like the SEC and FTC, which have historically been headed by boards or commissions whose members serve fixed terms. The Court held that while Congress may limit the President's removal power over the heads of multi-member expert agencies, extending similar protection to a single agency head wielding significant executive power is unconstitutional. The CFPB director exercises broad rulemaking, enforcement, and adjudicatory authority over a major segment of the economy without the check of a multi-member structure or meaningful presidential oversight. The Court found the for-cause removal restriction severable from the remainder of the Dodd-Frank Act, meaning the CFPB may continue to operate but its director serves at the pleasure of the President.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "591 U.S. 197",
        citedDocuments: ["act-018"]
      }
    },
    {
      id: "judgment-020",
      title: "Orrisch v. Commissioner, 55 T.C. 395 (1970)",
      category: "judgment",
      subcategory: "Tax - Partnership Allocations",
      datePublished: "1970-12-14",
      source: "United States Tax Court",
      pages: [
        {
          pageNumber: 1,
          content: `In Orrisch v. Commissioner, the Tax Court addressed the validity of a partnership agreement that allocated depreciation deductions to one partner who contributed cash while allocating income to another partner who contributed services. The IRS challenged the allocation, arguing that it lacked economic substance and was motivated primarily by tax avoidance. The Tax Court held that the allocation of depreciation lacked substantial economic effect because it did not reflect the economic arrangement of the partners. The depreciation allocation reduced one partner's capital account without a corresponding economic consequence because the partner bearing the depreciation deduction did not bear the economic burden of the decline in asset value. The decision predated the detailed regulations under Section 704(b) but articulated the principle that tax allocations must correspond to the underlying economic arrangement between the partners. This case was influential in the development of the substantial economic effect regulations which now provide detailed mechanical rules for testing partnership allocations.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "United States Tax Court",
        caseNumber: "55 T.C. 395",
        citedDocuments: ["act-019"]
      }
    },
    {
      id: "judgment-021",
      title: "Hempt Bros. v. United States, 490 F.2d 1172 (3d Cir. 1974)",
      category: "judgment",
      subcategory: "Tax - Corporate Formation",
      datePublished: "1974-01-11",
      source: "United States Court of Appeals, Third Circuit",
      pages: [
        {
          pageNumber: 1,
          content: `In Hempt Bros. v. United States, the Third Circuit addressed the interplay between Section 351 nonrecognition treatment and the assignment of income doctrine. Hempt Bros., a cash-method partnership, transferred its assets including accounts receivable with a zero basis to a newly formed corporation in exchange for stock. When the corporation collected the receivables, the IRS argued that the income should be taxed to the transferor partners under the assignment of income doctrine. The Third Circuit held that Section 351 overrides the assignment of income doctrine in the context of incorporations of ongoing businesses. The court reasoned that Congress intended Section 351 to facilitate business reorganizations and incorporations and that applying the assignment of income doctrine would frustrate this purpose. The court distinguished between the incorporation of an ongoing business, where the accounts receivable are an integral part of the transferred business, and cases involving isolated assignments of income rights designed purely for tax avoidance. The decision established an important exception to the assignment of income doctrine for bona fide Section 351 transactions.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "U.S. Court of Appeals, Third Circuit",
        caseNumber: "490 F.2d 1172",
        citedDocuments: ["act-020"]
      }
    },
    {
      id: "judgment-022",
      title: "Robles v. Domino's Pizza, 913 F.3d 898 (9th Cir. 2019)",
      category: "judgment",
      subcategory: "ADA - Website Accessibility",
      datePublished: "2019-01-15",
      source: "United States Court of Appeals, Ninth Circuit",
      pages: [
        {
          pageNumber: 1,
          content: `In Robles v. Domino's Pizza, the Ninth Circuit held that the Americans with Disabilities Act applies to websites and mobile applications of places of public accommodation. The plaintiff, who was blind and used screen-reading software, alleged that Domino's website and mobile app were not compatible with his screen reader, preventing him from ordering food. Domino's argued that the ADA does not apply to websites because they are not physical places and that imposing accessibility requirements without specific DOJ regulations would violate due process. The Ninth Circuit rejected both arguments. The court held that the ADA applies to services of a place of public accommodation, not just to physical access to the place itself. Because Domino's website and app facilitate access to the goods and services of its physical restaurants, they fall within the scope of Title III. The court also rejected the due process argument, holding that the ADA's general nondiscrimination mandate provides sufficient notice to covered entities. The Web Content Accessibility Guidelines published by the World Wide Web Consortium may inform the standard but are not required as formal regulations.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "U.S. Court of Appeals, Ninth Circuit",
        caseNumber: "913 F.3d 898",
        citedDocuments: ["act-021"]
      }
    },
    {
      id: "judgment-023",
      title: "Soliman v. Commissioner, 506 U.S. 168 (1993)",
      category: "judgment",
      subcategory: "Tax - Home Office",
      datePublished: "1993-01-12",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `In Commissioner v. Soliman, the Supreme Court addressed the meaning of principal place of business for purposes of the home office deduction under Section 280A. Dr. Soliman was an anesthesiologist who performed medical procedures at three hospitals but used a home office exclusively for administrative tasks including billing, correspondence, record keeping, and reading medical journals. The Court held that the home office was not his principal place of business because the most important activities of his profession, providing anesthesia, were performed at the hospitals. The Court established a two-factor test for determining the principal place of business: first, the relative importance of the activities performed at each location, and second, the time spent at each location. The Court gave primary weight to the first factor, concluding that the location where the most significant revenue-generating activities occur is the principal place of business. Congress subsequently amended Section 280A in 1997 to provide that a home office qualifies as the principal place of business if it is used for administrative or management activities and there is no other fixed location where the taxpayer conducts substantial administrative or management functions.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "506 U.S. 168",
        citedDocuments: ["act-022"]
      }
    },
    {
      id: "judgment-024",
      title: "Czyzewski v. Jevic Holding Corp., 580 U.S. 451 (2017)",
      category: "judgment",
      subcategory: "Bankruptcy - Priority Rules",
      datePublished: "2017-03-22",
      source: "Supreme Court of the United States",
      pages: [
        {
          pageNumber: 1,
          content: `In Czyzewski v. Jevic Holding Corp., the Supreme Court held that a bankruptcy court may not approve a structured dismissal of a Chapter 11 case that distributes estate assets in a manner that deviates from the Bankruptcy Code's ordinary priority rules without the consent of affected creditors. The case involved a structured dismissal that provided payment to general unsecured creditors while skipping over priority wage claims held by former employees. The priority rules under Section 507 of the Bankruptcy Code establish a hierarchy of claims that must generally be respected in distributions. The Court recognized that while bankruptcy courts have broad equitable powers, those powers are limited by the specific provisions of the Code. The absolute priority rule, which prohibits junior creditors from receiving distributions until senior creditors are paid in full, is a fundamental protection that applies in Chapter 11 plans and should apply with equal force to structured dismissals that effectively function as plans. The decision reinforced the importance of the statutory priority scheme and limited the ability of parties to use creative procedural mechanisms to circumvent the established order of payment.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "Supreme Court of the United States",
        caseNumber: "580 U.S. 451",
        citedDocuments: ["act-023"]
      }
    },
    {
      id: "judgment-025",
      title: "Neonatology Associates v. Commissioner, 115 T.C. 43 (2000)",
      category: "judgment",
      subcategory: "Tax - Penalties",
      datePublished: "2000-07-19",
      source: "United States Tax Court",
      pages: [
        {
          pageNumber: 1,
          content: `In Neonatology Associates v. Commissioner, the Tax Court addressed the reasonable cause and good faith defense to accuracy-related penalties under Section 6664(c). The case involved a tax shelter involving insurance arrangements that the IRS determined lacked economic substance. The taxpayers argued they relied in good faith on the advice of their tax advisors. The Tax Court held that reliance on a tax advisor may constitute reasonable cause and good faith only if the advisor was a competent professional who had sufficient expertise to justify reliance, the taxpayer provided necessary and accurate information to the advisor, and the taxpayer actually relied in good faith on the advisor's judgment. The court established a three-prong test requiring meaningful advisor independence, comprehensive disclosure of all relevant facts, and genuine reliance rather than a rubber stamp arrangement. The court found that the taxpayers failed this test because the advisors who promoted the shelter had an inherent conflict of interest and the taxpayers did not seek independent verification of the shelter's validity. This decision has been widely cited in penalty cases involving tax shelters and listed transactions.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        court: "United States Tax Court",
        caseNumber: "115 T.C. 43",
        citedDocuments: ["act-024"]
      }
    }
  ];
  return judgments;
}

function generatePOVs(): LegalDocument[] {
  const povs: LegalDocument[] = [
    {
      id: "pov-001",
      title: "The End of Chevron Deference and Its Impact on Tax Administration",
      category: "pov",
      subcategory: "Administrative Law Commentary",
      datePublished: "2024-08-15",
      source: "Tax Law Review, Vol. 79",
      pages: [
        {
          pageNumber: 1,
          content: `The Supreme Court's decision in Loper Bright Enterprises v. Raimondo overruling Chevron deference represents a seismic shift in administrative law with profound implications for tax administration. For four decades, Chevron deference provided a framework under which courts would defer to reasonable agency interpretations of ambiguous statutes. In the tax context, this meant that Treasury regulations addressing ambiguous provisions of the Internal Revenue Code received judicial deference so long as the interpretation was permissible. The elimination of Chevron deference requires courts to exercise independent judgment in interpreting tax statutes, potentially destabilizing decades of settled regulatory interpretation. Treasury has issued thousands of regulations interpreting the Code, many of which were upheld under Chevron's permissive standard. The question now is whether these regulations would survive under independent judicial review. Tax practitioners must reassess the reliability of regulatory guidance that was previously considered settled.`
        },
        {
          pageNumber: 2,
          content: `The practical impact of the end of Chevron deference on tax law may be more nuanced than initial reactions suggest. Many tax regulations implement specific statutory delegations of authority and may be upheld under the traditional Skidmore framework or under principles of legislative delegation. The Internal Revenue Code frequently grants Treasury explicit authority to prescribe regulations, and courts may interpret these grants as carrying interpretive force independent of Chevron. Additionally, many taxpayers and their advisors have structured transactions in reliance on existing regulations, and the doctrine of reliance interests may constrain judicial willingness to invalidate longstanding regulatory interpretations. The most vulnerable regulations are those that address genuinely ambiguous statutory provisions where Treasury exercised significant policymaking discretion. The cost sharing regulations at issue in Altera and the partnership allocation rules under Section 704(b) are examples of areas where the regulatory framework extends well beyond the statutory text and may face renewed challenge. Tax law practitioners should identify regulations critical to their clients' positions and evaluate the strength of those regulations under independent judicial review.`
        }
      ],
      metadata: {
        author: "Professor Sarah Mitchell, Georgetown University Law Center",
        citedDocuments: ["judgment-002", "judgment-009"]
      }
    },
    {
      id: "pov-002",
      title: "Economic Substance Doctrine After Codification",
      category: "pov",
      subcategory: "Tax Policy Analysis",
      datePublished: "2023-03-20",
      source: "Virginia Tax Review, Vol. 42",
      pages: [
        {
          pageNumber: 1,
          content: `Congress codified the economic substance doctrine in Section 7701(o) as part of the Health Care and Education Reconciliation Act of 2010. The codification provides that a transaction has economic substance only if it changes the taxpayer's economic position in a meaningful way apart from federal income tax effects and the taxpayer has a substantial purpose for entering into the transaction apart from federal income tax effects. This conjunctive two-prong test requires satisfaction of both the objective economic substance prong and the subjective business purpose prong. The statute also provides that potential financial profit from a transaction is taken into account only if the present value of the reasonably expected pre-tax profit is substantial in relation to the present value of the expected net tax benefits. The codification applies a strict liability penalty under Section 6662(b)(6) equal to 20 percent of any underpayment attributable to a disallowed transaction or 40 percent if the transaction is not adequately disclosed. The reasonable cause exception under Section 6664(c) does not apply to economic substance penalties, meaning that reliance on professional advice is not a defense.`
        },
        {
          pageNumber: 2,
          content: `The codification of the economic substance doctrine has created interpretive challenges. The statute provides that the doctrine applies only to transactions to which it is relevant, but does not specify when a transaction is subject to economic substance analysis. Courts have developed various approaches to this threshold question. Some courts apply the doctrine only when the IRS has identified a specific provision that the taxpayer has attempted to exploit. Other courts apply a broader test asking whether the taxpayer's claimed tax benefit appears inconsistent with congressional intent. The line between legitimate tax planning and abusive tax avoidance remains difficult to draw. Taxpayers are entitled to structure their transactions to minimize taxes, and the mere fact that a transaction has tax benefits does not subject it to economic substance scrutiny. However, transactions that are structured solely to generate tax benefits with no meaningful change in economic position beyond the tax savings are vulnerable to challenge. The strict liability penalty provides a strong deterrent but may also chill legitimate tax planning where the application of the doctrine is uncertain.`
        }
      ],
      metadata: {
        author: "Professor Robert Chen, NYU School of Law",
        citedDocuments: ["act-024", "judgment-025"]
      }
    },
    {
      id: "pov-003",
      title: "Section 199A and the Future of Pass-Through Taxation",
      category: "pov",
      subcategory: "Tax Policy Commentary",
      datePublished: "2024-06-10",
      source: "Harvard Business Law Review, Vol. 14",
      pages: [
        {
          pageNumber: 1,
          content: `Section 199A introduced the qualified business income deduction for pass-through entities and sole proprietorships, creating a maximum effective rate of 29.6 percent on qualified business income compared to the 21 percent flat rate on corporate income. The provision was designed to provide parity between corporate and pass-through business structures, but the complexity of the rules and the exclusion of specified service trades or businesses have generated significant controversy. The deduction is scheduled to expire after December 31, 2025, and its potential extension or modification is a central issue in current tax policy debates. Proponents argue that the deduction reduces the incentive to incorporate and levels the playing field between business forms. Critics contend that the deduction primarily benefits wealthy business owners, creates opportunities for gaming through entity structuring, and adds substantial complexity to the tax code. The W-2 wage limitation ensures that capital-intensive businesses with significant payrolls benefit most from the deduction while service businesses are restricted or excluded entirely.`
        },
        {
          pageNumber: 2,
          content: `The interaction between Section 199A and other provisions of the Code creates planning opportunities and pitfalls. The aggregation rules under the regulations allow taxpayers to combine related trades or businesses for purposes of applying the W-2 wage and qualified property limitations, potentially increasing the deduction for businesses that would independently fail the limitations. The specified service trade or business rules have prompted some taxpayers to restructure their businesses to separate service components from non-service components. The regulations provide a de minimis rule under which a business with gross receipts of 25 million dollars or less is not treated as a specified service business if less than 10 percent of its gross receipts are attributable to specified service activities. For businesses above the threshold, the percentage is 5 percent. The rental real estate safe harbor in Revenue Procedure 2019-38 provides a pathway for rental activities to qualify as trades or businesses for Section 199A purposes if specified record-keeping and minimum hour requirements are met. These planning opportunities illustrate the complexity inherent in providing a deduction based on the character and structure of business activities.`
        }
      ],
      metadata: {
        author: "Professor Jennifer Walsh, Columbia Law School",
        citedDocuments: ["act-007", "act-016"]
      }
    },
    {
      id: "pov-004",
      title: "Cryptocurrency Taxation: Current Framework and Open Questions",
      category: "pov",
      subcategory: "Digital Assets Commentary",
      datePublished: "2024-04-05",
      source: "Stanford Technology Law Review, Vol. 27",
      pages: [
        {
          pageNumber: 1,
          content: `The taxation of cryptocurrency and digital assets continues to evolve as the IRS develops guidance for an asset class that did not exist when the Internal Revenue Code was drafted. IRS Notice 2014-21 established the foundational principle that virtual currency is treated as property for federal tax purposes rather than as currency. This means that general tax principles applicable to property transactions apply to transactions using virtual currency. Each cryptocurrency transaction is a taxable event that requires the taxpayer to calculate gain or loss based on the difference between the fair market value of the cryptocurrency at the time of the transaction and the taxpayer's adjusted basis. This creates significant compliance challenges for taxpayers who may engage in hundreds or thousands of transactions across multiple platforms and wallets. The identification of specific units of cryptocurrency for purposes of determining basis requires the use of specific identification methods or default FIFO treatment, adding further complexity.`
        },
        {
          pageNumber: 2,
          content: `Several open questions remain in cryptocurrency taxation. The treatment of hard forks and airdrops has been partially addressed by Revenue Ruling 2019-24, which holds that a taxpayer who receives cryptocurrency through an airdrop following a hard fork has gross income equal to the fair market value of the new cryptocurrency at the time of receipt, provided the taxpayer has dominion and control. However, questions persist about the timing and measurement of income when new tokens are received but not immediately tradeable or when the taxpayer was unaware of the receipt. Staking rewards present similar issues, and the IRS has not issued definitive guidance on whether staking rewards are taxable upon receipt or upon disposition. Decentralized finance protocols create additional complexity through lending, borrowing, liquidity provision, and yield farming activities that may trigger tax consequences under existing property transaction rules. The Infrastructure Investment and Jobs Act of 2021 expanded information reporting requirements for digital asset transactions, requiring brokers to report customer transactions on Form 1099-DA beginning for transactions after January 1, 2025. The definition of broker for these purposes has been controversial, particularly regarding its potential application to decentralized exchanges and wallet providers.`
        }
      ],
      metadata: {
        author: "Professor David Kim, Stanford Law School",
        citedDocuments: ["act-001", "tax-019"]
      }
    },
    {
      id: "pov-005",
      title: "The Rise of AI in Legal Research and Due Diligence",
      category: "pov",
      subcategory: "Legal Technology",
      datePublished: "2024-09-12",
      source: "Yale Journal of Law and Technology, Vol. 26",
      pages: [
        {
          pageNumber: 1,
          content: `Artificial intelligence is transforming the practice of law in ways that were unimaginable a decade ago. Large language models and retrieval-augmented generation systems are being deployed for legal research, contract review, due diligence, and document drafting. These tools promise to increase efficiency and reduce costs while raising important questions about accuracy, reliability, and professional responsibility. The legal profession has been particularly cautious about adopting AI tools because of the severe consequences of errors. Incorrect legal citations, hallucinated case law, and mischaracterized holdings can result in sanctions, malpractice liability, and harm to clients. Several federal courts have adopted local rules requiring attorneys to disclose the use of AI in preparing court filings and to certify the accuracy of any AI-generated content. These requirements reflect the profession's recognition that AI tools are powerful but imperfect and that human oversight remains essential. The question is not whether AI will be used in legal practice but how it can be used responsibly and effectively.`
        },
        {
          pageNumber: 2,
          content: `The development of domain-specific AI tools for tax and legal research represents a significant opportunity to improve the quality and accessibility of legal services. Retrieval-augmented generation systems that combine large language models with curated databases of legal authorities can provide more accurate and verifiable results than general-purpose language models. By grounding the model's responses in specific source documents and requiring citations to primary authorities, these systems reduce the risk of hallucination and enable users to verify the accuracy of the information provided. The challenge is building systems that understand the nuances of legal reasoning, including the hierarchical nature of legal authority, the distinction between binding and persuasive precedent, the importance of jurisdictional differences, and the impact of subsequent legislative or judicial developments on the validity of prior authorities. Effective legal AI systems must also handle the complexity of multi-factor legal tests where the outcome depends on the weighing of multiple considerations rather than the application of bright-line rules.`
        }
      ],
      metadata: {
        author: "Professor Lisa Park, Yale Law School",
        citedDocuments: []
      }
    },
    {
      id: "pov-006",
      title: "Corporate Transparency Act: Beneficial Ownership Reporting Requirements",
      category: "pov",
      subcategory: "Corporate Law Commentary",
      datePublished: "2024-01-15",
      source: "Business Lawyer, Vol. 79",
      pages: [
        {
          pageNumber: 1,
          content: `The Corporate Transparency Act enacted as part of the Anti-Money Laundering Act of 2020 requires most corporations, limited liability companies, and other entities created by filing with a state to report beneficial ownership information to the Financial Crimes Enforcement Network. Beneficial owners are individuals who directly or indirectly exercise substantial control over the entity or who own or control at least 25 percent of the ownership interests. The reporting requirements took effect on January 1, 2024, for existing companies with a one-year compliance deadline and immediately for newly formed entities. Exempt entities include publicly traded companies, regulated financial institutions, tax-exempt organizations, and large operating companies with more than 20 full-time employees, more than 5 million dollars in annual gross receipts, and a physical presence in the United States. The Act imposes civil penalties of up to 500 dollars per day for violations and criminal penalties of up to two years imprisonment and 10,000 dollars in fines for willful violations. The implementation has generated significant controversy regarding the scope of the reporting requirements and the security of the beneficial ownership database.`
        }
      ],
      metadata: {
        author: "Attorney Michael Torres, Sullivan and Cromwell LLP",
        citedDocuments: ["act-012"]
      }
    },
    {
      id: "pov-007",
      title: "SOX Compliance Twenty Years Later: Lessons and Continuing Challenges",
      category: "pov",
      subcategory: "Corporate Governance",
      datePublished: "2023-07-30",
      source: "Journal of Corporation Law, Vol. 48",
      pages: [
        {
          pageNumber: 1,
          content: `Two decades after the enactment of the Sarbanes-Oxley Act, corporate governance and financial reporting standards have changed significantly. The internal controls requirements under Section 404 have become embedded in corporate operations with companies spending billions of dollars annually on compliance. The initial implementation was marked by significant costs and operational disruption particularly for smaller public companies, leading Congress to exempt smaller reporting companies from the auditor attestation requirement under Section 404(b). Studies have produced mixed results on whether SOX has improved the quality of financial reporting. Some research indicates a reduction in financial statement restatements and an increase in the timeliness of financial reporting. Other studies suggest that the compliance costs have discouraged companies from going public or remaining public, with some firms opting for private equity or foreign listings. The whistleblower provisions under Section 806 have been expanded by the Dodd-Frank Act which created a bounty program under Section 21F of the Securities Exchange Act providing financial rewards to whistleblowers who report securities law violations to the SEC.`
        }
      ],
      metadata: {
        author: "Professor Angela Rivera, University of Pennsylvania Law School",
        citedDocuments: ["act-012", "act-018"]
      }
    },
    {
      id: "pov-008",
      title: "FATCA Implementation Challenges for Foreign Financial Institutions",
      category: "pov",
      subcategory: "International Tax Commentary",
      datePublished: "2023-11-20",
      source: "Tax Notes International, Vol. 112",
      pages: [
        {
          pageNumber: 1,
          content: `The implementation of the Foreign Account Tax Compliance Act has created an unprecedented global system for the automatic exchange of financial account information for tax purposes. More than 100 jurisdictions have entered into intergovernmental agreements with the United States implementing FATCA, and the Common Reporting Standard developed by the OECD extends similar reporting requirements among participating countries. Despite its broad implementation, FATCA continues to present significant compliance challenges for foreign financial institutions. The due diligence procedures for identifying U.S. accounts require institutions to collect and verify documentation from account holders, a process that is both costly and administratively burdensome. The classification of entities as financial institutions, passive nonfinancial foreign entities, or active nonfinancial foreign entities determines their reporting obligations and requires analysis of their income, assets, and activities. Small and medium-sized financial institutions in developing countries face particular challenges in building the technology and compliance infrastructure needed to meet FATCA requirements. The withholding mechanism that serves as the enforcement backstop requires complex systems for tracking and applying withholding to different types of payments.`
        }
      ],
      metadata: {
        author: "Dr. Hans Weber, Max Planck Institute for Tax Law",
        citedDocuments: ["act-014"]
      }
    },
    {
      id: "pov-009",
      title: "Hot Assets and the Complexity of Partnership Taxation",
      category: "pov",
      subcategory: "Tax Commentary",
      datePublished: "2024-02-28",
      source: "Florida Tax Review, Vol. 27",
      pages: [
        {
          pageNumber: 1,
          content: `The treatment of hot assets under Section 751 represents one of the most complex and counterintuitive areas of partnership taxation. The provision reflects a tension between the aggregate theory of partnerships, which treats each partner as owning a proportionate share of partnership assets, and the entity theory, which treats the partnership interest as a single asset. Section 751(a) applies the aggregate theory by requiring a selling partner to treat gain attributable to hot assets as ordinary income rather than capital gain. Section 751(b) applies even more complex rules to disproportionate distributions, requiring a hypothetical exchange analysis that practitioners have long criticized as unworkable. The IRS proposed simplified regulations for Section 751(b) in 2014 that would replace the deemed exchange approach with a hotchpot method looking at the overall character of the distribution, but these regulations have not been finalized. The continued application of the existing regulations creates traps for unwary taxpayers and advisors, particularly in the context of partnership redemptions and liquidating distributions where the characterization of gain can have significant tax consequences.`
        }
      ],
      metadata: {
        author: "Professor Mark Stevens, University of Florida Levin College of Law",
        citedDocuments: ["act-015", "judgment-017"]
      }
    },
    {
      id: "pov-010",
      title: "TCJA Sunset Provisions: Planning for 2026 and Beyond",
      category: "pov",
      subcategory: "Tax Planning Commentary",
      datePublished: "2024-10-01",
      source: "Tax Adviser, Vol. 55",
      pages: [
        {
          pageNumber: 1,
          content: `The individual tax provisions of the Tax Cuts and Jobs Act are scheduled to sunset after December 31, 2025, creating significant uncertainty and planning opportunities. If the provisions expire without extension, individual tax rates will revert to the pre-TCJA brackets with a top rate of 39.6 percent. The standard deduction will return to approximately half its current level, personal exemptions will be restored, the state and local tax deduction will no longer be capped at 10,000 dollars, and the child tax credit will revert to 1,000 dollars. The estate and gift tax exemption will fall from approximately 13.6 million dollars to roughly 7 million dollars adjusted for inflation. Taxpayers should evaluate whether accelerating income into 2025 or deferring deductions to 2026 would be advantageous. For estate planning, the potential reduction in the lifetime exemption creates urgency for high-net-worth individuals to make gifts utilizing the current elevated exemption before the sunset. The IRS has confirmed in final regulations that gifts made under the higher exemption will not be clawed back if the exemption decreases, providing assurance for taxpayers who act before the sunset.`
        },
        {
          pageNumber: 2,
          content: `The corporate tax rate of 21 percent is permanent and will not change with the sunset of individual provisions. This creates an important planning consideration for business owners choosing between pass-through and corporate structures. If individual rates increase to 39.6 percent and the Section 199A deduction expires, the effective rate differential between corporate and pass-through income will widen significantly. Some pass-through businesses may find incorporation or conversion to C corporation status more attractive after the sunset. However, the double taxation of corporate income through corporate-level tax and shareholder-level tax on dividends and capital gains must be weighed against the benefits of the lower corporate rate. The qualified small business stock exclusion under Section 1202, which allows exclusion of gain on the sale of qualified small business stock held for more than five years, adds another dimension to the entity choice analysis. Planning for the sunset requires a full analysis of the taxpayer's income sources, deductions, estate plan, and long-term business objectives.`
        }
      ],
      metadata: {
        author: "John Anderson, CPA, Partner at KPMG",
        citedDocuments: ["act-016", "act-007"]
      }
    },
    {
      id: "pov-011",
      title: "Dodd-Frank at Fifteen: Assessing Financial Stability Reforms",
      category: "pov",
      subcategory: "Financial Regulation Commentary",
      datePublished: "2025-07-21",
      source: "Stanford Law Review, Vol. 77",
      pages: [
        {
          pageNumber: 1,
          content: `Fifteen years after the enactment of the Dodd-Frank Wall Street Reform and Consumer Protection Act, financial regulation has changed considerably. The most significant structural reforms, including the creation of the Financial Stability Oversight Council and the Orderly Liquidation Authority, have not been tested by a major financial crisis, making their effectiveness difficult to evaluate definitively. The Volcker Rule has been implemented and subsequently modified, with the 2019 amendments simplifying compliance for banking entities with smaller trading operations. The derivatives market reforms under Title VII have successfully moved a significant portion of the over-the-counter derivatives market to central clearing and exchange trading, increasing transparency and reducing counterparty risk. Capital and liquidity requirements for systemically important financial institutions have been strengthened, creating larger buffers against financial stress. However, critics argue that the regulatory framework has not kept pace with the emergence of new risks including those posed by financial technology companies, cryptocurrency platforms, and the increasing interconnectedness of global financial markets.`
        }
      ],
      metadata: {
        author: "Professor Rachel Foster, Stanford Law School",
        citedDocuments: ["act-018", "judgment-019"]
      }
    },
    {
      id: "pov-012",
      title: "Partnership Allocation Rules: Theory and Practice",
      category: "pov",
      subcategory: "Tax Commentary",
      datePublished: "2023-09-15",
      source: "Tax Law Review, Vol. 78",
      pages: [
        {
          pageNumber: 1,
          content: `The partnership allocation rules under Section 704(b) and the accompanying regulations represent one of the most intellectually demanding areas of federal tax law. The substantial economic effect framework was designed to ensure that partnership tax allocations correspond to the underlying economic arrangement among the partners. However, the complexity of the regulations has created a significant gap between theory and practice. Many partnership agreements are drafted by attorneys who rely on template provisions that mechanically satisfy the safe harbor requirements without fully understanding the economic implications. The capital account maintenance rules, the deficit restoration obligation, the qualified income offset, and the minimum gain chargeback provisions interact in ways that can produce unexpected results, particularly in the context of nonrecourse debt financing. The regulations governing allocations attributable to nonrecourse liabilities are particularly complex and add layers of analysis that test the limits of even experienced practitioners. The gap between the theoretical elegance of the substantial economic effect framework and the practical challenges of implementation remains a persistent issue in partnership taxation.`
        }
      ],
      metadata: {
        author: "Professor William Reed, University of Michigan Law School",
        citedDocuments: ["act-019", "judgment-020"]
      }
    },
    {
      id: "pov-013",
      title: "Small Business Reorganization Act: A New Chapter for Chapter 11",
      category: "pov",
      subcategory: "Bankruptcy Law Commentary",
      datePublished: "2024-03-15",
      source: "American Bankruptcy Law Journal, Vol. 98",
      pages: [
        {
          pageNumber: 1,
          content: `The Small Business Reorganization Act of 2019 created Subchapter V of Chapter 11, providing a streamlined reorganization process for small business debtors. Subchapter V eliminates several of the most costly and time-consuming aspects of traditional Chapter 11, including the requirement to file a disclosure statement, the absolute priority rule that prevents equity holders from retaining interests over the objection of unsecured creditors, and the requirement for creditor voting on the plan. Instead, the debtor proposes a plan within 90 days providing for the submission of future income to fund plan payments. The court may confirm the plan if it finds that the plan does not discriminate unfairly and is fair and equitable, meaning that all projected disposable income during a three to five year period will be applied to plan payments. The debt limit for Subchapter V eligibility was originally set at 2,725,625 dollars but was temporarily increased to 7.5 million dollars during the pandemic and was made permanent at 7.5 million dollars by subsequent legislation. Early results suggest that Subchapter V has increased the success rate of small business reorganizations by reducing costs and administrative burdens.`
        }
      ],
      metadata: {
        author: "Professor Catherine Brooks, Emory University School of Law",
        citedDocuments: ["act-023", "judgment-024"]
      }
    },
    {
      id: "pov-014",
      title: "The Arm's Length Standard in a Digital Economy",
      category: "pov",
      subcategory: "International Tax Commentary",
      datePublished: "2024-05-20",
      source: "Intertax, Vol. 52",
      pages: [
        {
          pageNumber: 1,
          content: `The arm's length standard, the cornerstone of international transfer pricing law, faces its greatest challenge in the context of the digital economy. Traditional transfer pricing methods rely on finding comparable transactions between unrelated parties, but the unique characteristics of digital business models, including network effects, user data as a value driver, multi-sided platforms, and the scale of operations without physical presence, make it difficult to identify true comparables. The OECD's Pillar One proposal represents an acknowledgment that the arm's length standard alone may not adequately address the allocation of taxing rights in the digital economy. Under Pillar One Amount A, a portion of the residual profit of large multinational enterprises would be allocated to market jurisdictions based on revenue sourcing rules rather than the traditional arm's length analysis. This represents a departure from the purely arm's length approach that has governed international tax for nearly a century. The political challenges of implementing Pillar One have been substantial, and the timeline for adoption has been repeatedly extended. Meanwhile, many countries have adopted unilateral digital services taxes that impose revenue-based levies on digital businesses, creating additional complexity and potential double taxation.`
        }
      ],
      metadata: {
        author: "Dr. Maria Santos, University of Amsterdam",
        citedDocuments: ["act-008", "judgment-010"]
      }
    },
    {
      id: "pov-015",
      title: "Opportunity Zones: Promise, Performance, and Policy Implications",
      category: "pov",
      subcategory: "Tax Policy Commentary",
      datePublished: "2024-07-10",
      source: "National Tax Journal, Vol. 77",
      pages: [
        {
          pageNumber: 1,
          content: `The Opportunity Zone program created by the Tax Cuts and Jobs Act in Sections 1400Z-1 and 1400Z-2 provides tax incentives for investment in designated low-income communities. Investors who reinvest capital gains into Qualified Opportunity Funds receive a temporary deferral of the reinvested gain, a basis step-up of 10 percent after five years (which has now passed for initial investments), and a permanent exclusion of gain on the appreciation of the Opportunity Zone investment if held for at least ten years. The program has attracted significant capital to designated zones, with estimates of Qualified Opportunity Fund investments exceeding 100 billion dollars. However, empirical analysis of the program's impact has raised questions about whether the investment is reaching the communities most in need. Research suggests that a disproportionate share of investment has flowed to zones that were already experiencing economic growth or gentrification rather than to the most distressed areas. The designation process, which allowed governors to nominate eligible census tracts, has been criticized for including tracts that may not have been the most deserving of targeted investment incentives.`
        }
      ],
      metadata: {
        author: "Dr. Elena Rodriguez, Brookings Institution",
        citedDocuments: ["act-016", "act-017"]
      }
    },
    {
      id: "pov-016",
      title: "State Conformity to Federal Tax Reform: A Patchwork of Responses",
      category: "pov",
      subcategory: "State Tax Commentary",
      datePublished: "2024-01-30",
      source: "State Tax Notes, Vol. 111",
      pages: [
        {
          pageNumber: 1,
          content: `The Tax Cuts and Jobs Act of 2017 created unprecedented challenges for state conformity to the federal tax code. States that use federal taxable income or federal adjusted gross income as the starting point for their own tax calculations had to decide whether and to what extent to conform to the extensive federal changes. The responses have been highly varied. Some states adopted rolling conformity, automatically incorporating federal changes. Others adopted static conformity to the Code as of a specific date, requiring affirmative legislative action to adopt subsequent changes. The SALT deduction cap created particular friction because it limited the federal deduction for state and local taxes. Several states responded by enacting pass-through entity elective tax provisions that allow partnerships and S corporations to pay state income tax at the entity level, generating a federal deduction that is not subject to the SALT cap. The IRS confirmed the validity of these workarounds in Notice 2020-75. The Section 199A deduction created another conformity issue because most states decouple from it, not wanting to provide an additional state-level deduction that would reduce state revenue without a corresponding state policy objective.`
        }
      ],
      metadata: {
        author: "Katherine Chen, Director, State Tax Policy Center",
        citedDocuments: ["act-016", "act-007"]
      }
    },
    {
      id: "pov-017",
      title: "ESG Investing and Fiduciary Duty Under ERISA",
      category: "pov",
      subcategory: "Employment Law Commentary",
      datePublished: "2024-04-22",
      source: "Employee Benefits Law Journal, Vol. 38",
      pages: [
        {
          pageNumber: 1,
          content: `The integration of environmental, social, and governance factors into ERISA plan investment decisions has become one of the most contentious issues in employee benefits law. The Department of Labor has issued multiple guidance documents over the years reflecting shifting views on the permissibility of considering ESG factors. The Biden administration's 2022 final rule clarified that fiduciaries may consider ESG factors when those factors are relevant to the risk-return analysis of an investment and that ESG considerations are not categorically different from other factors that fiduciaries routinely consider. This rule was challenged in litigation, and the broader debate reflects fundamental disagreements about the scope of fiduciary duty, the relevance of ESG factors to financial performance, and the appropriate role of retirement plan investments in advancing social objectives. Opponents argue that ERISA's exclusive purpose requirement limits fiduciaries to maximizing financial returns for participants and that incorporating ESG considerations introduces subjective value judgments that may conflict with this objective. Proponents counter that ESG factors are material to long-term investment performance and that ignoring them would itself constitute a breach of fiduciary duty.`
        }
      ],
      metadata: {
        author: "Professor Thomas Wright, Boston University School of Law",
        citedDocuments: ["act-010", "judgment-013"]
      }
    },
    {
      id: "pov-018",
      title: "The Tax Treatment of NFTs and Digital Collectibles",
      category: "pov",
      subcategory: "Digital Assets Commentary",
      datePublished: "2024-08-05",
      source: "Columbia Journal of Tax Law, Vol. 15",
      pages: [
        {
          pageNumber: 1,
          content: `Non-fungible tokens present unique tax classification questions that existing IRS guidance has only partially addressed. In Notice 2023-27, the IRS announced its intention to issue guidance on whether certain NFTs may be treated as collectibles subject to the higher 28 percent capital gains rate applicable to collectibles under Section 408(m). The notice provided a look-through analysis under which an NFT would be treated as a collectible if the associated right or asset would itself be a collectible. For example, an NFT representing a digital artwork would be a collectible because artwork is specifically listed in Section 408(m), while an NFT representing a right to use software would not. This approach, while logical, raises practical difficulties because many NFTs represent novel types of digital assets that do not fit neatly into existing categories. The classification has implications beyond the capital gains rate, affecting the deductibility of losses, the application of the wash sale rules, and the treatment of NFTs within retirement accounts. The rapid evolution of NFT use cases, including gaming assets, membership tokens, and fractional real estate interests, continues to outpace regulatory guidance.`
        }
      ],
      metadata: {
        author: "Professor Amy Nguyen, Columbia Law School",
        citedDocuments: ["pov-004", "act-001"]
      }
    },
    {
      id: "pov-019",
      title: "Anti-Money Laundering Obligations for Professional Service Firms",
      category: "pov",
      subcategory: "Compliance Commentary",
      datePublished: "2024-11-10",
      source: "Fordham Law Review, Vol. 92",
      pages: [
        {
          pageNumber: 1,
          content: `The expansion of anti-money laundering obligations to professional service firms including law firms, accounting firms, and real estate professionals represents a significant shift in the U.S. regulatory approach. The Anti-Money Laundering Act of 2020 and subsequent FinCEN rulemakings have extended beneficial ownership reporting and due diligence requirements beyond traditional financial institutions. Investment advisers became subject to AML program requirements under FinCEN's 2024 final rule, requiring them to establish AML programs, file suspicious activity reports, and comply with customer identification requirements. Proposals to extend similar requirements to attorneys and other professional gatekeepers have faced significant opposition from the legal profession citing attorney-client privilege and the potential chilling effect on client communications. However, international standards established by the Financial Action Task Force include legal professionals among the designated nonfinancial businesses and professions subject to AML obligations, and the United States faces increasing pressure to align with these global standards. The challenge is designing requirements that address the genuine risk of professional service firms being used to facilitate money laundering while respecting the unique role of attorneys and the importance of professional confidentiality.`
        }
      ],
      metadata: {
        author: "Professor Daniel Cooper, Fordham University School of Law",
        citedDocuments: ["pov-006"]
      }
    },
    {
      id: "pov-020",
      title: "Conservation Easements Under Attack: Syndicated Deals and IRS Enforcement",
      category: "pov",
      subcategory: "Tax Controversy",
      datePublished: "2024-06-25",
      source: "Tax Notes Federal, Vol. 183",
      pages: [
        {
          pageNumber: 1,
          content: `Syndicated conservation easement transactions have become one of the IRS's top enforcement priorities. These transactions typically involve a partnership that acquires property, obtains an inflated appraisal of the property's conservation value, donates a conservation easement, and allocates the resulting charitable deduction to investors who purchased partnership interests for a fraction of the claimed deduction. The IRS has designated syndicated conservation easement transactions as listed transactions under Notice 2017-10, requiring disclosure and imposing penalties for nondisclosure. The Sixth Circuit's decision in Hewitt v. Commissioner upheld the IRS position that certain syndicated conservation easement deductions must be entirely disallowed rather than adjusted to reflect a reasonable valuation. The SECURE 2.0 Act added Section 170(h)(7) imposing a per-partner cap on the charitable deduction for contributions of conservation easements by partnerships, limited to 2.5 times the partner's adjusted basis in the partnership. This statutory limitation effectively eliminates the economics of syndicated deals that relied on inflated valuations to produce outsized deductions.`
        }
      ],
      metadata: {
        author: "Attorney Sarah Goldman, Skadden Arps Slate Meagher and Flom LLP",
        citedDocuments: ["act-005", "act-024"]
      }
    },
    {
      id: "pov-021",
      title: "The Global Minimum Tax: Pillar Two Implementation Challenges",
      category: "pov",
      subcategory: "International Tax Commentary",
      datePublished: "2024-12-01",
      source: "British Tax Review, Vol. 2024",
      pages: [
        {
          pageNumber: 1,
          content: `The OECD's Pillar Two framework establishing a global minimum effective tax rate of 15 percent for large multinational enterprises represents the most significant change to the international tax system in a century. The framework consists of several interlocking rules: the Income Inclusion Rule, which allows a parent jurisdiction to impose top-up tax on low-taxed income of subsidiaries; the Undertaxed Profits Rule, which operates as a backstop by denying deductions or requiring adjustments when income is not subject to the minimum tax; and the Qualified Domestic Minimum Top-up Tax, which allows jurisdictions to collect the top-up tax themselves rather than ceding the revenue to other jurisdictions. Implementation has proceeded rapidly in many countries, with the European Union, the United Kingdom, Japan, Korea, and numerous other jurisdictions enacting domestic legislation. The United States has not enacted implementing legislation, creating complex interactions with its existing international tax provisions including GILTI and the BEAT. The GILTI rate of approximately 10.5 percent to 13.125 percent depending on the taxpayer's situation is below the 15 percent minimum, and the calculation methodology differs significantly from the Pillar Two framework.`
        }
      ],
      metadata: {
        author: "Professor James Morrison, Oxford University Faculty of Law",
        citedDocuments: ["act-008", "act-016"]
      }
    },
    {
      id: "pov-022",
      title: "Beneficial Ownership and the Limits of Corporate Veil Piercing",
      category: "pov",
      subcategory: "Corporate Law Commentary",
      datePublished: "2023-05-10",
      source: "Delaware Journal of Corporate Law, Vol. 48",
      pages: [
        {
          pageNumber: 1,
          content: `The doctrine of piercing the corporate veil allows courts to hold shareholders personally liable for the obligations of a corporation when the corporate form has been abused to perpetrate fraud or injustice. Despite its ubiquity in corporate law, the doctrine remains one of the most unpredictable and fact-specific areas of jurisprudence. Courts apply various multi-factor tests that examine the degree of separation between the corporation and its shareholders, the adequacy of capitalization, the commingling of funds and assets, the observance of corporate formalities, the use of the corporate entity for fraud or to evade legal obligations, and whether the corporation is a mere instrumentality or alter ego of the shareholder. The inherent unpredictability of these factor-based tests means that similarly situated parties may receive different outcomes depending on the jurisdiction and the court's weighing of the relevant factors. Delaware courts have been particularly reluctant to pierce the corporate veil, requiring a showing that the corporate form was used as a fraud or to promote injustice. The intersection of veil piercing with the Corporate Transparency Act's beneficial ownership reporting requirements creates an interesting dynamic where the same opacity that shields beneficial owners from legal accountability also triggers reporting obligations designed to increase transparency.`
        }
      ],
      metadata: {
        author: "Professor Richard Hayes, Widener University Delaware Law School",
        citedDocuments: ["pov-006"]
      }
    },
    {
      id: "pov-023",
      title: "Worker Classification in the Gig Economy: Tax and Employment Law Implications",
      category: "pov",
      subcategory: "Employment Tax Commentary",
      datePublished: "2024-09-30",
      source: "Boston College Law Review, Vol. 65",
      pages: [
        {
          pageNumber: 1,
          content: `The classification of workers as employees or independent contractors has significant tax and employment law consequences. Employers must withhold income taxes, pay FICA taxes, and provide employment benefits to employees, while independent contractors are responsible for their own taxes and benefits. The IRS applies a multi-factor common law test examining the degree of behavioral control, financial control, and the type of relationship between the parties. The Department of Labor applies an economic reality test under the Fair Labor Standards Act and recently revised its independent contractor rule to use a totality of the circumstances approach focusing on the economic dependence of the worker. The gig economy has intensified the classification debate because platform-based work models do not fit neatly into the traditional employee-independent contractor dichotomy. Workers for ride-sharing, delivery, and freelance platforms may have flexibility in when and how they work, suggesting independent contractor status, while the platforms control the terms of service, payment rates, and customer relationships, suggesting employment. California's AB 5 codified a strict ABC test that presumes worker status as an employee unless the hiring entity demonstrates that the worker is free from control, performs work outside the usual course of the hiring entity's business, and is customarily engaged in an independently established trade.`
        }
      ],
      metadata: {
        author: "Professor Laura Chen, Boston College Law School",
        citedDocuments: ["act-002", "act-006"]
      }
    },
    {
      id: "pov-024",
      title: "Digital Services Taxes and Trade Law Conflicts",
      category: "pov",
      subcategory: "International Tax Commentary",
      datePublished: "2024-03-05",
      source: "Georgetown Journal of International Law, Vol. 55",
      pages: [
        {
          pageNumber: 1,
          content: `The proliferation of unilateral digital services taxes adopted by countries worldwide has created significant trade tensions and potential conflicts with international trade law obligations. Countries including France, the United Kingdom, Italy, Spain, India, and many others have enacted DSTs typically imposed at rates of 2 to 7.5 percent on gross revenue derived from specified digital services including online advertising, digital intermediation, and the sale of user data. The United States has characterized these taxes as discriminatory against American technology companies and has threatened retaliatory tariffs under Section 301 of the Trade Act of 1974. The fundamental issue is whether DSTs are consistent with income tax treaty obligations and the most favored nation principle under the General Agreement on Trade in Services. Proponents argue that DSTs address a legitimate gap in the international tax framework where digital companies can derive significant revenue from a jurisdiction without creating a taxable presence. Opponents counter that DSTs are designed to target specific companies and violate the principle of tax neutrality between business models. The relationship between unilateral DSTs and the OECD's Pillar One multilateral solution remains uncertain, with many countries committing to withdraw their DSTs upon implementation of Pillar One but the timeline for Pillar One implementation continuing to slip.`
        }
      ],
      metadata: {
        author: "Professor Sophia Martinez, Georgetown University Law Center",
        citedDocuments: ["pov-021", "pov-014"]
      }
    },
    {
      id: "pov-025",
      title: "Artificial Intelligence and Tax Compliance: Opportunities and Risks",
      category: "pov",
      subcategory: "Tax Administration Commentary",
      datePublished: "2024-11-25",
      source: "Tax Notes Federal, Vol. 185",
      pages: [
        {
          pageNumber: 1,
          content: `The IRS has increasingly turned to artificial intelligence and machine learning tools to enhance tax compliance and enforcement. The agency uses predictive analytics to identify returns with high audit potential, natural language processing to analyze large volumes of documents and correspondence, and pattern recognition algorithms to detect potentially fraudulent claims. The Inflation Reduction Act of 2022 provided approximately 80 billion dollars in additional IRS funding over ten years, a significant portion of which is allocated to technology modernization and enforcement. The IRS has announced initiatives to use AI to identify complex partnership structures used to shield income, to detect high-income nonfiling, and to improve customer service through automated assistants. However, the use of AI in tax administration raises important concerns about algorithmic bias, transparency, due process, and taxpayer rights. If AI-driven audit selection disproportionately targets certain demographic groups or types of taxpayers, it could violate principles of equal treatment and undermine public confidence in the tax system. The National Taxpayer Advocate has recommended that the IRS develop safeguards including algorithmic impact assessments, human review of AI-driven decisions, and transparency about the factors used in audit selection models.`
        }
      ],
      metadata: {
        author: "Dr. Robert Park, Georgetown University McDonough School of Business",
        citedDocuments: ["pov-005", "act-024"]
      }
    }
  ];
  return povs;
}

function generateTaxDocs(): LegalDocument[] {
  const taxDocs: LegalDocument[] = [
    {
      id: "tax-001",
      title: "IRS Publication 17 - Your Federal Income Tax (Overview)",
      category: "tax",
      subcategory: "IRS Publication",
      datePublished: "2024-01-15",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `IRS Publication 17 provides a comprehensive guide to individual federal income tax. Gross income includes all income received in the form of money, goods, property, and services that is not exempt from tax. This includes wages, salaries, tips, interest, dividends, business income, capital gains, pensions, rents, royalties, alimony received under pre-2019 agreements, unemployment compensation, and Social Security benefits that exceed specified thresholds. Income may be constructively received even if it is not actually in the taxpayer's possession. Under the constructive receipt doctrine, income is taxable when it is credited to the taxpayer's account, set apart for the taxpayer, or otherwise made available so that the taxpayer may draw upon it at any time. Restrictions on the taxpayer's control over the income may negate constructive receipt. Taxpayers must report income from all sources including those outside the United States. The obligation to report income applies regardless of whether the taxpayer receives a Form W-2, Form 1099, or any other information return.`
        },
        {
          pageNumber: 2,
          content: `Filing requirements depend on the taxpayer's filing status, age, and gross income. For 2024, single taxpayers under age 65 must file if their gross income is at least 14,600 dollars. Married taxpayers filing jointly under 65 must file if combined gross income is at least 29,200 dollars. These thresholds increase for taxpayers age 65 or older and for blind taxpayers. Self-employed individuals must file if net earnings from self-employment are 400 dollars or more. Taxpayers may choose to file even when not required if they are due a refund of withheld taxes or estimated tax payments, or if they qualify for refundable credits such as the earned income tax credit. The standard deduction for 2024 is 14,600 dollars for single filers and 29,200 dollars for married filing jointly. Taxpayers who itemize deductions on Schedule A may deduct state and local taxes up to 10,000 dollars, mortgage interest on acquisition debt up to 750,000 dollars, charitable contributions subject to percentage limitations, and medical expenses exceeding 7.5 percent of adjusted gross income.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-001", "act-002"]
      }
    },
    {
      id: "tax-002",
      title: "Revenue Ruling 99-7: Employee vs. Independent Contractor",
      category: "tax",
      subcategory: "Revenue Ruling",
      datePublished: "1999-02-01",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `Revenue Ruling 99-7 addresses the determination of worker classification for federal employment tax purposes. The ruling provides guidance on applying the common law factors to determine whether a worker is an employee or an independent contractor. The IRS examines three categories of evidence: behavioral control, financial control, and the type of relationship between the parties. Behavioral control includes whether the business has the right to direct and control what the worker does and how the worker does the job. Factors include the type and degree of instructions given, the extent of training provided, and whether evaluation systems measure the details of how the work is performed rather than just the end result. Financial control includes whether the business has the right to direct and control the financial and business aspects of the worker's job. Factors include the extent to which the worker has unreimbursed business expenses, the extent of the worker's investment in facilities or tools used, the extent to which the worker makes services available to the relevant market, the method of payment, and the opportunity for profit or loss.`
        },
        {
          pageNumber: 2,
          content: `The type of relationship between the parties includes factors such as written contracts describing the relationship, whether the business provides employee-type benefits, the permanency of the relationship, and whether the services performed are a key aspect of the regular business of the company. No single factor is determinative, and all facts and circumstances must be considered. The IRS may reclassify a worker from independent contractor to employee, resulting in liability for unpaid employment taxes, penalties, and interest. Section 530 of the Revenue Act of 1978 provides relief from employment tax liability for businesses that have a reasonable basis for treating a worker as an independent contractor, consistently treated the worker and similarly situated workers as independent contractors, and filed all required federal tax returns consistent with that treatment. This safe harbor protects the business from employment tax liability even if the workers are ultimately determined to be employees. However, Section 530 does not change the worker's actual classification and does not protect the business from liability under other employment laws such as ERISA or the Fair Labor Standards Act.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["pov-023"]
      }
    },
    {
      id: "tax-003",
      title: "Treasury Regulation 1.162-5: Education Expenses",
      category: "tax",
      subcategory: "Treasury Regulation",
      datePublished: "1967-06-15",
      source: "Department of the Treasury",
      pages: [
        {
          pageNumber: 1,
          content: `Treasury Regulation 1.162-5 provides rules for the deductibility of education expenses as trade or business expenses under Section 162. Education expenses are deductible if the education maintains or improves skills required in the taxpayer's current trade or business, or if the education meets the express requirements of the employer or applicable law as a condition of retaining the taxpayer's established employment relationship, status, or rate of compensation. Education expenses are not deductible if the education is needed to meet the minimum educational requirements for qualification in the taxpayer's current employment or trade or business, or if the education qualifies the taxpayer for a new trade or business even if the taxpayer does not intend to enter the new trade or business. The minimum education requirement rule means that the costs of obtaining a degree or license needed to enter a profession are personal expenses even if the taxpayer is already performing the work. For example, a law clerk who attends law school cannot deduct the tuition as a business expense because the legal education qualifies the individual for the new trade or business of practicing law.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-002"]
      }
    },
    {
      id: "tax-004",
      title: "IRS Publication 550 - Investment Income and Expenses",
      category: "tax",
      subcategory: "IRS Publication",
      datePublished: "2024-02-01",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `IRS Publication 550 covers the tax treatment of investment income and expenses. Interest income is generally taxable and must be reported on the tax return. This includes interest from bank accounts, certificates of deposit, money market accounts, corporate bonds, and U.S. government obligations. Interest on state and local government bonds is generally exempt from federal income tax under Section 103 but may be subject to the alternative minimum tax if the bonds are private activity bonds. Original issue discount on bonds must be included in income annually as it accrues regardless of whether the taxpayer receives any payment. Market discount on bonds purchased in the secondary market is generally included in income as ordinary income when the bond is sold or redeemed. Dividend income from domestic corporations is reported on Form 1099-DIV. Qualified dividends, which include most dividends from domestic corporations and certain foreign corporations, are taxed at the preferential capital gains rates of 0, 15, or 20 percent depending on the taxpayer's taxable income. Nonqualified dividends are taxed at ordinary income rates.`
        },
        {
          pageNumber: 2,
          content: `Capital gains and losses result from the sale or exchange of capital assets. The holding period determines whether the gain or loss is short-term or long-term. Assets held for one year or less produce short-term gains or losses taxed at ordinary income rates. Assets held for more than one year produce long-term gains or losses eligible for preferential rates. Net capital losses are deductible against ordinary income up to 3,000 dollars per year with unused losses carried forward indefinitely. The wash sale rule under Section 1091 disallows losses on the sale of securities if substantially identical securities are purchased within 30 days before or after the sale. The disallowed loss is added to the basis of the replacement securities. Investment expenses including advisory fees, custodial fees, and safe deposit box rental were deductible as miscellaneous itemized deductions subject to the 2 percent floor prior to the Tax Cuts and Jobs Act. For tax years 2018 through 2025, miscellaneous itemized deductions are suspended and investment expenses are not deductible for individuals. The net investment income tax under Section 1411 imposes an additional 3.8 percent tax on the lesser of net investment income or the excess of modified adjusted gross income over specified thresholds.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-001", "act-017"]
      }
    },
    {
      id: "tax-005",
      title: "IRS Publication 557 - Tax-Exempt Status for Your Organization",
      category: "tax",
      subcategory: "IRS Publication",
      datePublished: "2024-03-01",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `IRS Publication 557 describes the rules and procedures for organizations seeking recognition of exemption from federal income tax under Section 501(c)(3) and other subsections of Section 501. Organizations seeking exemption under Section 501(c)(3) must file Form 1023 or Form 1023-EZ with the IRS. Form 1023-EZ is available for organizations with projected annual gross receipts of 50,000 dollars or less and total assets of 250,000 dollars or less. The application must describe the organization's activities, governance, financial information, and demonstrate that the organization is organized and operated exclusively for exempt purposes. The organizational test requires that the organization's articles of organization limit its purposes to one or more exempt purposes and do not expressly empower it to engage in activities that are not in furtherance of those purposes. The articles must also include a dissolution provision requiring that upon dissolution, the organization's assets will be distributed for an exempt purpose or to the federal government or a state or local government for a public purpose.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-003", "judgment-006"]
      }
    },
    {
      id: "tax-006",
      title: "Revenue Procedure 2000-37: Reverse Like-Kind Exchanges",
      category: "tax",
      subcategory: "Revenue Procedure",
      datePublished: "2000-09-15",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `Revenue Procedure 2000-37 provides a safe harbor for reverse like-kind exchanges under Section 1031 where the replacement property is acquired before the relinquished property is transferred. In a typical forward exchange, the taxpayer transfers the relinquished property first and then acquires the replacement property. In a reverse exchange, the order is reversed, creating complications because the taxpayer temporarily holds both properties. The IRS will not challenge the qualification of a reverse exchange as a tax-deferred exchange under Section 1031 if the exchange is conducted through an exchange accommodation titleholder who acquires and holds the replacement property or the relinquished property under a qualified exchange accommodation arrangement. The EAT must be treated as the beneficial owner of the property for federal income tax purposes. The arrangement must be entered into with the intent that the property held by the EAT represents either replacement property or relinquished property in an exchange intended to qualify under Section 1031. The total time the EAT holds the property cannot exceed 180 days. Identification of the relinquished property must be made within 45 days.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-004", "judgment-007"]
      }
    },
    {
      id: "tax-007",
      title: "IRS Publication 526 - Charitable Contributions",
      category: "tax",
      subcategory: "IRS Publication",
      datePublished: "2024-02-15",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `IRS Publication 526 explains how to claim a deduction for charitable contributions. To be deductible, contributions must be made to qualified organizations. Contributions to individuals, political organizations, and candidates for public office are not deductible. The organization must be organized and operated exclusively for charitable, religious, educational, scientific, or literary purposes. The IRS maintains a searchable database of organizations eligible to receive tax-deductible contributions called Tax Exempt Organization Search. Cash contributions must be substantiated by a bank record, receipt, or written communication from the charitable organization showing the name of the organization, the date of the contribution, and the amount. For cash contributions of 250 dollars or more, a contemporaneous written acknowledgment from the charitable organization is required. The acknowledgment must state whether the organization provided any goods or services in consideration for the contribution, and if so, must provide a description and good faith estimate of the value of those goods or services. Contributions of property are generally deductible at fair market value. For contributions of property valued at more than 500 dollars, the taxpayer must file Form 8283.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-005", "judgment-008"]
      }
    },
    {
      id: "tax-008",
      title: "IRS Publication 560 - Retirement Plans for Small Business",
      category: "tax",
      subcategory: "IRS Publication",
      datePublished: "2024-01-30",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `IRS Publication 560 discusses retirement plan options for small businesses including SEP IRAs, SIMPLE IRAs, and qualified plans such as 401(k) plans and defined benefit plans. A Simplified Employee Pension plan allows employers to make tax-deductible contributions to traditional IRAs established for each eligible employee. The maximum contribution for 2024 is the lesser of 25 percent of the employee's compensation or 69,000 dollars. All eligible employees must be included in the plan and the same contribution percentage must apply to all participants. A SIMPLE IRA is available to employers with 100 or fewer employees who received at least 5,000 dollars in compensation during the preceding year. Employees may make elective deferrals of up to 16,000 dollars for 2024 with a catch-up contribution of 3,500 dollars for employees age 50 or older. The employer must either match employee contributions dollar for dollar up to 3 percent of compensation or make a nonelective contribution of 2 percent of compensation for each eligible employee. Qualified plans under Section 401(a) offer greater flexibility in plan design but involve more complex administration and compliance requirements.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-006"]
      }
    },
    {
      id: "tax-009",
      title: "Notice 2024-02: SECURE 2.0 Act Guidance",
      category: "tax",
      subcategory: "IRS Notice",
      datePublished: "2024-01-05",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `Notice 2024-02 provides guidance on various provisions of the SECURE 2.0 Act of 2022 affecting retirement plans. The notice addresses the automatic enrollment requirement for new 401(k) and 403(b) plans, confirming that plans established after December 29, 2022, must automatically enroll eligible employees at a contribution rate of at least 3 percent but not more than 10 percent of compensation, with automatic annual increases of 1 percent until the rate reaches at least 10 percent but not more than 15 percent. The notice clarifies that the requirement applies to plans established by a new employer rather than an existing employer that adopts a new plan document for an existing plan. The notice also addresses the new Roth catch-up contribution requirement under which participants with wages exceeding 145,000 dollars in the prior year from the employer sponsoring the plan must make catch-up contributions on a Roth basis. The IRS announced a two-year administrative transition period extending the effective date of this requirement to January 1, 2026. During the transition period, plans may continue to allow pre-tax catch-up contributions for all eligible participants regardless of compensation level.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-025", "act-006"]
      }
    },
    {
      id: "tax-010",
      title: "Treasury Regulation 1.199A-1: Qualified Business Income Deduction Overview",
      category: "tax",
      subcategory: "Treasury Regulation",
      datePublished: "2019-01-18",
      source: "Department of the Treasury",
      pages: [
        {
          pageNumber: 1,
          content: `Treasury Regulation 1.199A-1 provides the general framework for the qualified business income deduction under Section 199A. The deduction is available to individuals, estates, and trusts that have qualified business income from a qualified trade or business operated directly or through a pass-through entity. The deduction is equal to the lesser of 20 percent of the taxpayer's combined qualified business income or 20 percent of the taxpayer's taxable income reduced by net capital gains. Combined qualified business income is the sum of the deductible amounts for each qualified trade or business. For taxpayers with taxable income below the threshold amount, which is 191,950 dollars for single filers and 383,900 dollars for joint filers in 2024, the deduction is simply 20 percent of qualified business income without regard to the W-2 wage or qualified property limitations and without regard to whether the business is a specified service trade or business. For taxpayers above the threshold, the deduction for each qualified trade or business is limited to the greater of 50 percent of W-2 wages paid by the business or 25 percent of W-2 wages plus 2.5 percent of the unadjusted basis immediately after acquisition of all qualified property.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-007"]
      }
    },
    {
      id: "tax-011",
      title: "Treasury Regulation 1.267(a)-1: Transactions Between Related Taxpayers",
      category: "tax",
      subcategory: "Treasury Regulation",
      datePublished: "1960-11-18",
      source: "Department of the Treasury",
      pages: [
        {
          pageNumber: 1,
          content: `Treasury Regulation 1.267(a)-1 implements the loss disallowance and deduction matching rules of Section 267 for transactions between related taxpayers. The regulation specifies that no deduction is allowed for losses from sales or exchanges of property directly or indirectly between persons specified in any of the paragraphs of Section 267(b). The loss is disallowed regardless of whether the property is sold at a price above its fair market value, provided the parties are related as defined in the statute. The regulation clarifies that the disallowance applies to both realized losses and losses that would otherwise be allowable under other provisions of the Code. The indirect transaction rule prevents taxpayers from avoiding the disallowance by routing transactions through unrelated intermediaries. If a sale between related parties is structured through an intermediary and the intermediary's role lacks independent economic significance, the transaction will be treated as a direct sale between the related parties. The transferee's ability to use the disallowed loss to reduce gain on a subsequent sale to an unrelated party under Section 267(d) provides partial relief from the harshness of the disallowance rule.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-011"]
      }
    },
    {
      id: "tax-012",
      title: "IRS Publication 925 - Passive Activity and At-Risk Rules",
      category: "tax",
      subcategory: "IRS Publication",
      datePublished: "2024-03-15",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `IRS Publication 925 explains the passive activity loss rules under Section 469 and the at-risk rules under Section 465. Passive activities include trade or business activities in which the taxpayer does not materially participate and rental activities regardless of participation level. Material participation requires the taxpayer to be involved in the operations of the activity on a regular, continuous, and substantial basis. The IRS applies seven tests for material participation: working more than 500 hours in the activity during the year; the taxpayer's participation constituting substantially all participation; participation of more than 100 hours and not less than any other individual; the activity is a significant participation activity and total participation in all significant participation activities exceeds 500 hours; material participation in any five of the preceding ten taxable years; a personal service activity with material participation in any three preceding taxable years; or based on all the facts and circumstances the taxpayer participates on a regular continuous and substantial basis. Passive losses can only offset passive income. Suspended losses carry forward and become deductible when passive income is generated or when the entire interest in the activity is disposed of in a fully taxable transaction.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-013", "judgment-016"]
      }
    },
    {
      id: "tax-013",
      title: "IRS Form 8938 Instructions - Statement of Specified Foreign Financial Assets",
      category: "tax",
      subcategory: "IRS Form Instructions",
      datePublished: "2024-01-20",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `Form 8938 is used to report specified foreign financial assets if the total value of those assets exceeds applicable reporting thresholds. For taxpayers living in the United States and filing as unmarried or married filing separately, the reporting threshold is 50,000 dollars on the last day of the tax year or 75,000 dollars at any time during the tax year. For married taxpayers filing jointly living in the United States, the thresholds are 100,000 dollars and 150,000 dollars respectively. Higher thresholds apply to taxpayers living abroad. Specified foreign financial assets include financial accounts maintained by foreign financial institutions, stock or securities issued by a non-U.S. person that is not held in an account maintained by a financial institution, any interest in a foreign entity, and any financial instrument or contract that has an issuer or counterparty that is not a U.S. person. Assets held in accounts at U.S. financial institutions, including U.S. branches of foreign financial institutions, are not specified foreign financial assets. The reporting requirement applies even if the assets produce no income during the year. The penalty for failure to file is 10,000 dollars with an additional penalty of up to 10,000 dollars for each 30-day period of noncompliance after IRS notification, up to a maximum of 50,000 dollars.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-014"]
      }
    },
    {
      id: "tax-014",
      title: "Revenue Ruling 2023-24: Basis of Digital Assets",
      category: "tax",
      subcategory: "Revenue Ruling",
      datePublished: "2023-12-20",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `Revenue Ruling 2023-24 addresses the determination of basis for digital assets under various acquisition methods. When digital assets are purchased for cash, the basis is the amount paid including any transaction fees, commissions, or other costs of acquisition. When digital assets are received as compensation for services, the basis is the fair market value of the digital assets at the time of receipt, which is also the amount included in gross income. When digital assets are received through mining or staking, the basis is the fair market value at the time the taxpayer gains dominion and control over the assets. For assets received through a hard fork followed by an airdrop, the basis is the fair market value at the time of receipt as established in Revenue Ruling 2019-24. When multiple units of the same digital asset are acquired at different times and different prices, the taxpayer must identify which specific units are being sold or exchanged. If the taxpayer cannot specifically identify the units, the first-in first-out method applies. Taxpayers must maintain adequate records to establish the basis of digital assets, including date and time of acquisition, basis and fair market value at the time of acquisition, and date and time of sale or disposition.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-017", "pov-004"]
      }
    },
    {
      id: "tax-015",
      title: "Revenue Ruling 84-111: Methods for Incorporating a Partnership",
      category: "tax",
      subcategory: "Revenue Ruling",
      datePublished: "1984-01-01",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `Revenue Ruling 84-111 describes three methods by which a partnership may convert to a corporate form and analyzes the tax consequences of each method. The first method, the assets-over method, involves the partnership transferring its assets and liabilities to the corporation in exchange for stock, followed by the partnership distributing the stock to the partners in liquidation. The second method, the assets-up method, involves the partnership distributing its assets and liabilities to the partners in liquidation, followed by the partners transferring the assets and liabilities to the corporation in exchange for stock. The third method, the interests-over method, involves the partners transferring their partnership interests to the corporation in exchange for stock, followed by the partnership distributing its assets to the corporation in liquidation. Each method produces different tax consequences regarding the basis of assets in the corporation's hands, the basis of stock in the partners' hands, and the holding period of the stock. The ruling holds that the chosen method will be respected for tax purposes if the steps involved are actually undertaken. The assets-over method is generally the simplest and most commonly used approach.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-020", "judgment-021"]
      }
    },
    {
      id: "tax-016",
      title: "Revenue Procedure 2013-13: Simplified Home Office Deduction",
      category: "tax",
      subcategory: "Revenue Procedure",
      datePublished: "2013-01-15",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `Revenue Procedure 2013-13 provides a simplified method for determining the amount of allowable deduction for business use of a home under Section 280A. Under the simplified method, the deduction is calculated by multiplying 5 dollars by the square footage of the home used regularly and exclusively for business, up to a maximum of 300 square feet. The maximum deduction under the simplified method is therefore 1,500 dollars per year. The simplified method is an alternative to the regular method, which requires taxpayers to determine actual expenses allocated to the business use portion of the home including mortgage interest or rent, real estate taxes, utilities, insurance, depreciation, and repairs. The simplified method eliminates the need to maintain detailed records of actual expenses and simplifies the calculation. Taxpayers using the simplified method may still deduct the full amount of mortgage interest and real estate taxes as itemized deductions on Schedule A, whereas taxpayers using the regular method must allocate these expenses between business and personal use. The simplified method does not allow depreciation of the home and therefore does not require depreciation recapture upon sale. Taxpayers may change between the regular and simplified methods from year to year.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-022", "judgment-023"]
      }
    },
    {
      id: "tax-017",
      title: "Treasury Regulation 1.6662-4: Substantial Understatement of Income Tax",
      category: "tax",
      subcategory: "Treasury Regulation",
      datePublished: "2003-06-24",
      source: "Department of the Treasury",
      pages: [
        {
          pageNumber: 1,
          content: `Treasury Regulation 1.6662-4 provides rules for determining whether a taxpayer has a substantial understatement of income tax subject to the accuracy-related penalty under Section 6662(b)(2). A substantial understatement exists when the amount of the understatement exceeds the greater of 10 percent of the tax required to be shown on the return or 5,000 dollars. For corporations other than S corporations, a substantial understatement exists when the amount exceeds the lesser of 10 percent of the tax or 10 million dollars. The understatement is reduced by the portion attributable to tax treatment for which there is substantial authority, or for which the relevant facts are adequately disclosed on the return or in a statement attached to the return. Substantial authority exists when the weight of authorities supporting the taxpayer's treatment is substantial in relation to the weight of authorities supporting a contrary position. Authorities that may be considered include the Internal Revenue Code, Treasury regulations, revenue rulings, revenue procedures, tax treaties, court cases, congressional intent as reflected in committee reports, Joint Committee on Taxation explanations, and IRS announcements and notices. Private letter rulings and technical advice memoranda issued to other taxpayers are not authority.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-024", "judgment-025"]
      }
    },
    {
      id: "tax-018",
      title: "IRS Notice 2024-73: SECURE 2.0 Roth Catch-Up Transition Relief",
      category: "tax",
      subcategory: "IRS Notice",
      datePublished: "2024-08-19",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `Notice 2024-73 extends the administrative transition period for the SECURE 2.0 Act requirement that catch-up contributions by higher-compensated participants in 401(k) and 403(b) plans be made on a Roth basis. Under Section 603 of the SECURE 2.0 Act, participants who had FICA wages exceeding 145,000 dollars from the employer sponsoring the plan during the prior calendar year must make any catch-up contributions as designated Roth contributions. The original effective date was January 1, 2024. Notice 2023-62 previously provided transition relief through December 31, 2025. Notice 2024-73 extends this transition period through December 31, 2025, and confirms that the requirement will take effect for taxable years beginning after December 31, 2025. During the transition period, plans are not required to implement the Roth catch-up requirement and may continue to allow pre-tax catch-up contributions for all eligible participants. The notice also clarifies that plans that do not currently offer a Roth contribution option will need to add one before the effective date if they wish to continue allowing catch-up contributions by higher-compensated participants. Plans that do not offer catch-up contributions at all are not affected by the requirement.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-025", "act-006"]
      }
    },
    {
      id: "tax-019",
      title: "IRS Notice 2014-21: Virtual Currency Guidance",
      category: "tax",
      subcategory: "IRS Notice",
      datePublished: "2014-03-25",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `Notice 2014-21 provides the foundational IRS guidance on the federal tax treatment of transactions involving virtual currency. The notice establishes that virtual currency is treated as property for federal tax purposes and that general tax principles applicable to property transactions apply. Virtual currency is not treated as currency for purposes of determining whether a transaction results in foreign currency gain or loss. A taxpayer who receives virtual currency as payment for goods or services must include the fair market value of the virtual currency in gross income measured in U.S. dollars as of the date of receipt. The basis of virtual currency received as payment for goods or services is the fair market value of the virtual currency at the time of receipt. A taxpayer who mines virtual currency has gross income equal to the fair market value of the mined virtual currency as of the date of receipt. If virtual currency mining constitutes a trade or business, the net earnings from the activity are subject to self-employment tax. The character of gain or loss from the sale or exchange of virtual currency depends on whether the virtual currency is a capital asset in the hands of the taxpayer. For most individuals who hold virtual currency as an investment, gains are capital gains. Third party settlement organizations, payment processors, and exchanges that facilitate virtual currency transactions may have reporting obligations under Section 6050W.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-001", "pov-004"]
      }
    },
    {
      id: "tax-020",
      title: "Revenue Ruling 2019-24: Hard Forks and Airdrops",
      category: "tax",
      subcategory: "Revenue Ruling",
      datePublished: "2019-10-09",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `Revenue Ruling 2019-24 addresses the tax treatment of cryptocurrency received through a hard fork followed by an airdrop. A hard fork occurs when a cryptocurrency undergoes a protocol change resulting in a permanent divergence from the legacy blockchain, creating a new cryptocurrency. An airdrop is a distribution of cryptocurrency to the distributed ledger addresses of multiple taxpayers. The ruling holds that if a taxpayer receives new cryptocurrency following a hard fork, the taxpayer has gross income under Section 61 at the time the taxpayer gains dominion and control over the new cryptocurrency. The amount of income is equal to the fair market value of the new cryptocurrency at the time it is received. If the taxpayer does not receive units of the new cryptocurrency, for example because the taxpayer's exchange does not support the new cryptocurrency or the taxpayer's wallet does not allow access to it, the taxpayer does not have gross income. The ruling also addresses airdrops that are not connected to hard forks, confirming that cryptocurrency received through an airdrop is gross income at the time the taxpayer gains dominion and control over the cryptocurrency. The basis of cryptocurrency received through a hard fork or airdrop is equal to the amount included in gross income.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["tax-019", "pov-004"]
      }
    },
    {
      id: "tax-021",
      title: "IRS Publication 946 - How to Depreciate Property",
      category: "tax",
      subcategory: "IRS Publication",
      datePublished: "2024-02-20",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `IRS Publication 946 explains the rules for depreciating business and income-producing property. The Modified Accelerated Cost Recovery System is the current depreciation system for most tangible property placed in service after 1986. MACRS assigns each asset to a property class that determines its recovery period and depreciation method. The major property classes include 3-year property (certain manufacturing tools and racehorses), 5-year property (automobiles, computers, office equipment), 7-year property (office furniture, fixtures, agricultural structures), 15-year property (land improvements, municipal wastewater treatment plants), 27.5-year residential rental property, and 39-year nonresidential real property. The half-year convention treats all property as placed in service at the midpoint of the year, while the mid-month convention applies to real property. Section 179 allows taxpayers to elect to deduct the cost of qualifying property in the year it is placed in service rather than recovering it through depreciation. The maximum Section 179 deduction for 2024 is 1,220,000 dollars, reduced dollar for dollar when the cost of qualifying property placed in service exceeds 3,050,000 dollars.`
        },
        {
          pageNumber: 2,
          content: `Bonus depreciation under Section 168(k) allows taxpayers to deduct a specified percentage of the cost of qualified property in the year it is placed in service. The Tax Cuts and Jobs Act increased the bonus depreciation percentage to 100 percent for qualified property acquired and placed in service after September 27, 2017, and before January 1, 2023. The percentage phases down by 20 percent per year thereafter: 80 percent for 2023, 60 percent for 2024, 40 percent for 2025, 20 percent for 2026, and 0 percent for 2027 and later. Qualified property includes tangible personal property with a recovery period of 20 years or less, certain computer software, water utility property, and qualified film, television, and live theatrical productions. Used property qualifies for bonus depreciation under the Tax Cuts and Jobs Act provisions, a change from prior law which required property to be new. Listed property, including passenger automobiles, is subject to annual depreciation limitations. For passenger automobiles placed in service in 2024, the maximum first-year depreciation deduction including bonus depreciation is 20,400 dollars, with reduced limits in subsequent years.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-002", "act-016"]
      }
    },
    {
      id: "tax-022",
      title: "IRS Publication 544 - Sales and Other Dispositions of Assets",
      category: "tax",
      subcategory: "IRS Publication",
      datePublished: "2024-02-10",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `IRS Publication 544 explains the tax rules for sales, exchanges, and other dispositions of assets including the determination of gain or loss, the distinction between capital and ordinary gain or loss, and special rules for certain types of transactions. Gain or loss is determined by comparing the amount realized on the disposition with the adjusted basis of the property. The amount realized includes money received, the fair market value of property or services received, and any liabilities assumed by the buyer or liabilities to which the transferred property is subject. Adjusted basis starts with the original cost basis and is increased by capital improvements and decreased by depreciation, amortization, and casualty loss deductions. Section 1231 provides favorable treatment for gains and losses from the sale or exchange of property used in a trade or business and held for more than one year. Net Section 1231 gains are treated as long-term capital gains, while net Section 1231 losses are treated as ordinary losses. The lookback rule under Section 1231(c) requires net Section 1231 gains to be treated as ordinary income to the extent of unrecaptured net Section 1231 losses from the preceding five tax years.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-017", "act-002"]
      }
    },
    {
      id: "tax-023",
      title: "IRS Publication 334 - Tax Guide for Small Business",
      category: "tax",
      subcategory: "IRS Publication",
      datePublished: "2024-01-25",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `IRS Publication 334 provides tax guidance for individuals who are sole proprietors or statutory employees. A sole proprietorship is an unincorporated business owned by one individual. The business income and expenses are reported on Schedule C of Form 1040. All net income from a sole proprietorship is subject to self-employment tax under Section 1401, which consists of Social Security tax at 12.4 percent on net earnings up to the Social Security wage base and Medicare tax at 2.9 percent on all net earnings. An additional 0.9 percent Medicare tax applies to self-employment income exceeding 200,000 dollars for single filers or 250,000 dollars for married filing jointly. The taxpayer may deduct the employer-equivalent portion of self-employment tax as an adjustment to income on Form 1040. Business expenses must be both ordinary and necessary to be deductible under Section 162. Common deductible expenses for sole proprietors include advertising, car and truck expenses, contract labor, depreciation, employee benefit programs, insurance, interest on business debt, legal and professional services, office expenses, rent or lease payments, repairs and maintenance, supplies, taxes and licenses, travel and meals, utilities, and wages.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-002", "act-022"]
      }
    },
    {
      id: "tax-024",
      title: "Revenue Ruling 73-476: Assignment of Income Doctrine",
      category: "tax",
      subcategory: "Revenue Ruling",
      datePublished: "1973-01-01",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `Revenue Ruling 73-476 addresses the application of the assignment of income doctrine to taxpayers who attempt to shift income to other persons through contractual arrangements or property transfers. The doctrine, derived from the Supreme Court's decision in Lucas v. Earl (1930), provides that income is taxable to the person who earns it regardless of any arrangement to direct payment to another person. The fruit and tree metaphor established in Lucas v. Earl holds that the fruit cannot be attributed to a different tree from that on which it grew. The doctrine applies to income from services and income from property. For services, the person who performs the services is taxed on the compensation regardless of whether payment is directed to a third party. For property, the income is taxed to the owner of the property at the time the income is generated. A genuine transfer of the income-producing property before the income accrues is respected, but a transfer of the right to receive income while retaining the property is an assignment of income. The doctrine prevents taxpayers from reducing their tax liability by deflecting income to family members in lower tax brackets or to entities with favorable tax characteristics. The doctrine applies regardless of whether the assignment is made before or after the income is earned if the assignor is the person who earned the income through personal services.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-001", "judgment-003"]
      }
    },
    {
      id: "tax-025",
      title: "IRS Publication 541 - Partnerships",
      category: "tax",
      subcategory: "IRS Publication",
      datePublished: "2024-03-10",
      source: "Internal Revenue Service",
      pages: [
        {
          pageNumber: 1,
          content: `IRS Publication 541 describes the general rules for forming and operating a partnership for federal tax purposes. A partnership is a relationship between two or more persons who join together to carry on a trade or business, with each person contributing money, property, labor, or skill and each expecting to share in the profits and losses. A partnership does not pay income tax. Instead, it passes through its items of income, gain, loss, deduction, and credit to its partners, who report these items on their individual returns. The partnership files Form 1065, U.S. Return of Partnership Income, as an informational return and provides each partner with a Schedule K-1 showing their distributive share of partnership items. A partner's distributive share is determined by the partnership agreement if the allocation has substantial economic effect under Section 704(b). If the allocation lacks substantial economic effect, the partner's distributive share is determined in accordance with the partner's interest in the partnership considering all facts and circumstances. Partners are not employees of the partnership and guaranteed payments for services or use of capital are taxed differently from wages. A partner's basis in the partnership interest starts with the amount contributed and is adjusted annually for the partner's distributive share of income, gain, loss, deduction, and distributions.`
        }
      ],
      metadata: {
        jurisdiction: "Federal",
        citedDocuments: ["act-019", "act-015"]
      }
    }
  ];
  return taxDocs;
}

// full dataset
export function getAllDocuments(): LegalDocument[] {
  return [
    ...generateActs(),
    ...generateJudgments(),
    ...generatePOVs(),
    ...generateTaxDocs()
  ];
}

// lookup by id
export function getDocumentById(id: string): LegalDocument | undefined {
  return getAllDocuments().find(doc => doc.id === id);
}

// filter by category
export function getDocumentsByCategory(category: DocCategory): LegalDocument[] {
  return getAllDocuments().filter(doc => doc.category === category);
}
