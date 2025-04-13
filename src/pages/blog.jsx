import React, { useState } from 'react';
import Hero from "../components/Hero"; // Assuming you have this component
import LoanImage from "../assets/loan-img.webp"; // Assuming you have this image

const blogPosts = [
    {
        title: 'Understanding Bridging Loans in 2025',
        summary: 'Explore how bridging finance works in the current market, and when it makes sense to use it.',
        content: 'Bridging loans are short-term solutions used by property buyers to bridge the gap between transactions...',
        date: 'April 7, 2025',
        slug: 'understanding-bridging-loans-2025',
    },
    {
        title: 'Top 5 Mortgage Tips for First-Time Buyers',
        summary: 'Avoid common mistakes and secure your ideal mortgage with these expert tips.',
        content: '1. Get a mortgage in principle. 2. Use a broker. 3. Know your LTV. 4. Budget for fees. 5. Lock in your rate.',
        date: 'April 5, 2025',
        slug: 'mortgage-tips-first-time-buyers',
    },
    {
        title: '2025 Property Investment Strategies for UK Landlords',
        summary: 'Maximise ROI with updated rental yield strategies and tax considerations.',
        content: 'With interest rates shifting, landlords should focus on areas with growing demand, assess fixed rate options...',
        date: 'April 2, 2025',
        slug: 'property-investment-strategies-2025',
    },
    {
        title: 'Stamp Duty Explained: How Much Will You Pay in 2025?',
        summary: 'Use this quick breakdown to understand your tax obligations when buying property.',
        content: 'Stamp duty applies to property purchases over certain thresholds. First-time buyers get relief...',
        date: 'April 1, 2025',
        slug: 'stamp-duty-uk-2025',
    },
    {
        title: 'How to Refinance Your Mortgage in 2025',
        summary: 'A full guide to switching lenders or rates for better deals in today’s market.',
        content: 'Start by checking early repayment charges. Use a broker to compare rates. Submit a new mortgage application...',
        date: 'March 30, 2025',
        slug: 'refinancing-mortgage-2025',
    },
    {
        title: 'How Bridging Loans Help Chain Breaks',
        summary: 'Prevent sales falling through with short-term bridging finance solutions.',
        content: 'When a buyer pulls out, bridging loans can help you complete the purchase while relisting the original property...',
        date: 'March 28, 2025',
        slug: 'bridging-loans-chain-breaks',
    },
    {
        title: 'What’s the Best Mortgage Type for 2025?',
        summary: 'Compare fixed, tracker, variable and offset mortgages and see what suits your profile.',
        content: 'In a high interest environment, fixed rates offer stability. Offset mortgages are ideal for savers...',
        date: 'March 26, 2025',
        slug: 'best-mortgage-type-2025',
    },
    {
        title: 'Help to Buy vs Shared Ownership: What’s Right for You?',
        summary: 'Explore both schemes for low-deposit home ownership.',
        content: 'Help to Buy lets you borrow 20% from the government interest-free for 5 years, while Shared Ownership...',
        date: 'March 25, 2025',
        slug: 'help-to-buy-vs-shared-ownership',
    },
    {
        title: 'Tips for Getting a Mortgage if You’re Self-Employed',
        summary: 'Self-employed buyers face extra checks — here’s how to prepare.',
        content: 'You’ll need 2-3 years of SA302s, steady income, and potentially a larger deposit. A broker can help...',
        date: 'March 24, 2025',
        slug: 'self-employed-mortgage-uk',
    },
    {
        title: 'How Long Does a Mortgage Offer Last?',
        summary: 'Find out how long you have to complete before reapplying.',
        content: 'Most mortgage offers are valid for 3–6 months. If your completion gets delayed, you may need to request an extension...',
        date: 'March 22, 2025',
        slug: 'mortgage-offer-validity',
    },
    {
        title: 'Using a Mortgage Broker vs Going Direct',
        summary: 'Which route is best for your situation in 2025?',
        content: 'Brokers access a wider range of deals and simplify paperwork, but may charge fees. Direct deals may lack flexibility...',
        date: 'March 20, 2025',
        slug: 'mortgage-broker-vs-direct',
    },
    {
        title: 'What is Loan-to-Value (LTV) and Why It Matters',
        summary: 'LTV affects your mortgage options and rates — here’s what to know.',
        content: 'The lower your LTV, the lower your interest rate. Try to aim for 75% LTV or better for the best deals...',
        date: 'March 18, 2025',
        slug: 'loan-to-value-ltv-explained',
    },
    {
        title: 'Can You Get a Mortgage with Bad Credit?',
        summary: 'Yes — but expect different terms. Here’s how to prepare.',
        content: 'Specialist lenders accept poor credit, but you may need a larger deposit or guarantor. Credit repair before applying helps...',
        date: 'March 16, 2025',
        slug: 'bad-credit-mortgage-uk',
    },
    {
        title: 'The Ultimate Guide to Buy-to-Let Mortgages',
        summary: 'From deposits to rental coverage, learn how to finance rental property.',
        content: 'You’ll usually need a 25% deposit and rent must cover 125–145% of the monthly payment. Limited company buy-to-lets are popular...',
        date: 'March 15, 2025',
        slug: 'buy-to-let-mortgage-guide',
    },
    {
        title: 'Should You Fix Your Mortgage Rate Now?',
        summary: 'Rates are rising — but is fixing now the right move?',
        content: 'If you want budgeting certainty, fixed rates are ideal. But tracker deals may fall if interest rates drop again...',
        date: 'March 13, 2025',
        slug: 'should-you-fix-rate-2025',
    },
    {
        title: 'Bridging Finance for Auction Property Purchases',
        summary: 'Quick funding for auction timelines.',
        content: 'Auction purchases require completion within 28 days — bridging finance ensures fast access to capital...',
        date: 'March 12, 2025',
        slug: 'bridging-auction-property',
    },
    {
        title: 'Understanding Early Repayment Charges',
        summary: 'Avoid penalties by checking your deal terms.',
        content: 'ERCs can cost thousands if you exit early. Check your mortgage docs or use a broker to calculate the impact...',
        date: 'March 10, 2025',
        slug: 'early-repayment-charges-ercs',
    },
    {
        title: 'How to Use Equity Release Wisely',
        summary: 'Tap into your home’s value — but know the long-term effects.',
        content: 'Equity release lets you access funds now, but it reduces your estate’s future value. Always get advice...',
        date: 'March 9, 2025',
        slug: 'equity-release-2025',
    },
    {
        title: 'Green Mortgages: What Are They?',
        summary: 'Eco-friendly homes could mean lower mortgage rates.',
        content: 'If your property has an EPC rating of A or B, some lenders offer discounted green mortgage rates...',
        date: 'March 8, 2025',
        slug: 'green-mortgages-uk',
    },
    {
        title: 'Mortgage Valuations vs Surveys: Know the Difference',
        summary: 'Avoid nasty surprises by understanding what each includes.',
        content: 'A mortgage valuation is for the lender — not you. Get a homebuyer report or full building survey for peace of mind...',
        date: 'March 7, 2025',
        slug: 'mortgage-valuation-vs-survey',
    },
    {
        title: 'How to Switch to an Interest-Only Mortgage',
        summary: 'Learn if it’s right for you and what lenders require.',
        content: 'You’ll need a solid repayment strategy (e.g. investments or property sale). LTV limits are stricter...',
        date: 'March 6, 2025',
        slug: 'interest-only-mortgage-switch',
    },
    {
        title: 'Mortgage Porting Explained: Moving Without Penalty',
        summary: 'Take your current deal to a new property.',
        content: 'Porting lets you keep your rate and avoid ERCs when moving. However, affordability and property value must be reassessed...',
        date: 'March 5, 2025',
        slug: 'mortgage-porting-guide',
    },
    {
        title: 'How Much Can You Borrow? Mortgage Affordability Explained',
        summary: 'Factors that affect how much lenders will offer you.',
        content: 'Lenders assess income, debts, credit score, and outgoings. Some cap borrowing at 4.5x your salary...',
        date: 'March 4, 2025',
        slug: 'mortgage-affordability-uk',
    },
    {
        title: 'Using Bridging Loans for Renovation Projects',
        summary: 'Fast cash for uninhabitable or unmortgageable homes.',
        content: 'Bridging loans work great for properties that need major work before a traditional mortgage is possible...',
        date: 'March 3, 2025',
        slug: 'bridging-renovation-loan',
    },
    {
        title: '2025 Mortgage Market Predictions from Experts',
        summary: 'What the industry expects from rates, approvals, and demand.',
        content: 'Analysts forecast stabilising rates and a slight uptick in approvals as inflation cools down...',
        date: 'March 2, 2025',
        slug: 'mortgage-market-predictions-2025',
    }
];


export default function BlogPage() {
    const [expandedSlug, setExpandedSlug] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const toggleExpand = (slug) => {
        setExpandedSlug(expandedSlug === slug ? null : slug);
    };

    const filteredPosts = blogPosts.filter((post) => {
        const q = searchQuery.toLowerCase();
        return (
            post.title.toLowerCase().includes(q) ||
            post.summary.toLowerCase().includes(q) ||
            post.content.toLowerCase().includes(q)
        );
    });

    return (
        <>
            <Hero
                title="The Lending Company Blog"
                subHeading="Insights, guides, and expert tips on mortgages, bridging loans, and property finance."
                className="hero-2" // You might need to adjust this class
                imageUrl={LoanImage} // Use the same image as the success page
            />

            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
                <div style={{ marginBottom: '30px', textAlign: 'center' }}>
                    <input
                        type="text"
                        placeholder="Search blog posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            padding: '10px 15px',
                            width: '300px',
                            maxWidth: '90%',
                            borderRadius: '8px',
                            border: '1px solid #ccc',
                        }}
                    />
                </div>

                {filteredPosts.length === 0 ? (
                    <p style={{ textAlign: 'center', color: '#999' }}>No blog posts found.</p>
                ) : (
                    <div style={{ display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                        {filteredPosts.map((post) => (
                            <div
                                key={post.slug}
                                style={{
                                    border: '1px solid #eee',
                                    borderRadius: '12px',
                                    padding: '20px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                                    backgroundColor: '#fff',
                                    transition: 'box-shadow 0.3s ease',
                                }}
                            >
                                <h2 style={{ fontSize: '22px', marginBottom: '10px' }}>{post.title}</h2>
                                <p style={{ fontSize: '14px', color: '#999', marginBottom: '10px' }}>{post.date}</p>
                                <p style={{ marginBottom: '15px', color: '#333' }}>{post.summary}</p>

                                {expandedSlug === post.slug && (
                                    <p style={{ marginBottom: '15px', color: '#444', fontSize: '15px' }}>{post.content}</p>
                                )}

                                <button
                                    onClick={() => toggleExpand(post.slug)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#0077cc',
                                        cursor: 'pointer',
                                        fontWeight: 'bold',
                                        padding: 0,
                                    }}
                                >
                                    {expandedSlug === post.slug ? 'Show less ▲' : 'Read more →'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}