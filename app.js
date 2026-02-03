// DOM Elements
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const navSectionHeaders = document.querySelectorAll('.nav-section-header');
const navItems = document.querySelectorAll('.nav-item');
const pageTitle = document.getElementById('pageTitle');
const breadcrumbSection = document.getElementById('breadcrumbSection');
const breadcrumbPage = document.getElementById('breadcrumbPage');
const dashboardContent = document.getElementById('dashboardContent');

// ==========================================
// METRIC DEFINITIONS DATABASE
// ==========================================
const metricDefinitions = {
    // DORA Metrics
    'deployment-frequency': {
        framework: 'dora',
        title: 'Deployment Frequency',
        subtitle: 'How often code is deployed to production',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>`,
        calculation: 'Total successful deployments ÷ Time period (days/weeks)',
        formula: 'DF = Deployments / Time Period',
        significance: 'Deployment Frequency measures how often your organization deploys code to production. Higher frequency indicates better automation, smaller batch sizes, and faster feedback loops. Elite teams deploy on-demand, multiple times per day.',
        history: 'Introduced by Google\'s DevOps Research and Assessment (DORA) team in 2014. Based on 6+ years of research with over 32,000 professionals worldwide. Published in "Accelerate" book by Nicole Forsgren, Jez Humble, and Gene Kim.',
        benchmarks: [
            { level: 'elite', label: 'Elite', value: 'Multiple/day' },
            { level: 'high', label: 'High', value: '1/week - 1/month' },
            { level: 'medium', label: 'Medium', value: '1/month - 6/month' },
            { level: 'low', label: 'Low', value: '< 1/6 months' }
        ],
        benefits: [
            'Faster time-to-market for new features',
            'Reduced risk through smaller changes',
            'Quicker feedback from users and stakeholders',
            'Improved team morale and confidence'
        ],
        origin: 'DORA Research, 2014'
    },
    'lead-time': {
        framework: 'dora',
        title: 'Lead Time for Changes',
        subtitle: 'Time from code commit to production',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
        calculation: 'Time when code is committed → Time when code is running in production',
        formula: 'LT = Deploy Time - Commit Time',
        significance: 'Lead Time measures the efficiency of your delivery pipeline. Shorter lead times mean faster value delivery, quicker bug fixes, and more responsive teams. It reflects the health of your CI/CD pipeline and review processes.',
        history: 'Derived from Lean manufacturing principles (Toyota Production System) and adapted by DORA for software delivery. Part of the "Four Key Metrics" that predict organizational performance.',
        benchmarks: [
            { level: 'elite', label: 'Elite', value: '< 1 hour' },
            { level: 'high', label: 'High', value: '1 day - 1 week' },
            { level: 'medium', label: 'Medium', value: '1 week - 1 month' },
            { level: 'low', label: 'Low', value: '> 1 month' }
        ],
        benefits: [
            'Faster delivery of value to customers',
            'Quick response to market changes',
            'Identifies bottlenecks in the pipeline',
            'Enables rapid experimentation'
        ],
        origin: 'DORA Research, 2014'
    },
    'change-failure-rate': {
        framework: 'dora',
        title: 'Change Failure Rate',
        subtitle: 'Percentage of deployments causing failures',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
        calculation: '(Failed deployments requiring rollback/hotfix ÷ Total deployments) × 100',
        formula: 'CFR = (Failed Deploys / Total Deploys) × 100%',
        significance: 'Change Failure Rate indicates the quality of your release process. Lower rates mean better testing, code review, and deployment practices. High CFR suggests issues with testing coverage, code quality, or deployment processes.',
        history: 'Established by DORA as a quality metric that balances speed metrics. Research shows elite performers achieve both high velocity AND low failure rates, disproving the speed vs. quality trade-off myth.',
        benchmarks: [
            { level: 'elite', label: 'Elite', value: '0-15%' },
            { level: 'high', label: 'High', value: '16-30%' },
            { level: 'medium', label: 'Medium', value: '31-45%' },
            { level: 'low', label: 'Low', value: '> 45%' }
        ],
        benefits: [
            'Higher customer satisfaction and trust',
            'Reduced emergency firefighting',
            'Lower stress on engineering teams',
            'Better code quality and testing practices'
        ],
        origin: 'DORA Research, 2014'
    },
    'mttr': {
        framework: 'dora',
        title: 'Mean Time to Restore',
        subtitle: 'How quickly you recover from failures',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 11-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>`,
        calculation: 'Sum of all recovery times ÷ Number of incidents',
        formula: 'MTTR = Σ(Recovery Time) / Incident Count',
        significance: 'MTTR measures organizational resilience. Fast recovery minimizes customer impact and business disruption. It reflects incident response maturity, monitoring quality, and system observability.',
        history: 'Originally from reliability engineering, adopted by DORA to measure recovery capability. Shifts focus from preventing all failures (impossible) to recovering quickly from them (achievable).',
        benchmarks: [
            { level: 'elite', label: 'Elite', value: '< 1 hour' },
            { level: 'high', label: 'High', value: '< 1 day' },
            { level: 'medium', label: 'Medium', value: '1 day - 1 week' },
            { level: 'low', label: 'Low', value: '> 1 week' }
        ],
        benefits: [
            'Minimized customer impact during outages',
            'Reduced revenue loss from downtime',
            'Better on-call experience for engineers',
            'Improved system observability'
        ],
        origin: 'DORA Research, 2014'
    },
    // SPACE Metrics
    'satisfaction': {
        framework: 'space',
        title: 'Satisfaction & Well-Being',
        subtitle: 'How fulfilled developers feel with their work',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`,
        calculation: 'Aggregated survey responses on job satisfaction, work-life balance, and team health',
        formula: 'Survey Score (1-10) + Sentiment Analysis + Burnout Indicators',
        significance: 'Satisfaction predicts retention, productivity, and innovation. Happy developers write better code, collaborate more effectively, and stay longer. It\'s the foundation of sustainable high performance.',
        history: 'SPACE framework was introduced in 2021 by researchers from GitHub, Microsoft, and University of Victoria. Published in ACM Queue journal as a response to oversimplified productivity metrics.',
        benchmarks: [
            { level: 'elite', label: 'Thriving', value: '8.5-10' },
            { level: 'high', label: 'Engaged', value: '7-8.4' },
            { level: 'medium', label: 'Neutral', value: '5-6.9' },
            { level: 'low', label: 'At Risk', value: '< 5' }
        ],
        benefits: [
            'Higher retention and lower turnover',
            'Increased innovation and creativity',
            'Better team collaboration',
            'Sustainable long-term performance'
        ],
        origin: 'SPACE Framework, 2021'
    },
    'performance': {
        framework: 'space',
        title: 'Performance',
        subtitle: 'Outcomes and impact of developer work',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>`,
        calculation: 'Quality of code + Reliability of systems + Customer impact + Business outcomes',
        formula: 'Code Quality Score + System Reliability + Customer Satisfaction',
        significance: 'Performance focuses on outcomes, not just outputs. It measures the actual value delivered to customers and the business, not just lines of code or features shipped. Quality matters as much as quantity.',
        history: 'Part of the SPACE framework that challenges activity-based metrics. Emphasizes that true performance is multi-dimensional and cannot be captured by a single number.',
        benchmarks: [
            { level: 'elite', label: 'Exceptional', value: '90-100%' },
            { level: 'high', label: 'Strong', value: '75-89%' },
            { level: 'medium', label: 'Developing', value: '50-74%' },
            { level: 'low', label: 'Needs Focus', value: '< 50%' }
        ],
        benefits: [
            'Focus on customer value over activity',
            'Quality-driven development culture',
            'Better business alignment',
            'Meaningful work for developers'
        ],
        origin: 'SPACE Framework, 2021'
    },
    'activity': {
        framework: 'space',
        title: 'Activity',
        subtitle: 'Count of actions or outputs',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
        calculation: 'Commits + PRs + Code Reviews + Meetings + Documentation',
        formula: 'Weighted sum of development activities',
        significance: 'Activity metrics provide signals but never tell the complete story. High activity can indicate productivity OR thrashing. Low activity might mean efficiency OR disengagement. Always interpret in context.',
        history: 'SPACE includes Activity to acknowledge that output counts exist, but explicitly warns against using them in isolation. The framework promotes balanced interpretation.',
        benchmarks: [
            { level: 'elite', label: 'Balanced', value: 'Context-dependent' },
            { level: 'high', label: 'Active', value: 'Above team avg' },
            { level: 'medium', label: 'Normal', value: 'Team average' },
            { level: 'low', label: 'Review', value: 'Below avg' }
        ],
        benefits: [
            'Visibility into work patterns',
            'Identification of workload imbalances',
            'Capacity planning insights',
            'Early warning for burnout (too high) or disengagement (too low)'
        ],
        origin: 'SPACE Framework, 2021'
    },
    'collaboration': {
        framework: 'space',
        title: 'Communication & Collaboration',
        subtitle: 'How people work together',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>`,
        calculation: 'PR review participation + Cross-team contributions + Knowledge sharing + Meeting patterns',
        formula: 'Review Engagement + Cross-team PRs + Documentation + Communication Score',
        significance: 'Software is a team sport. Collaboration quality affects code quality, knowledge distribution, and team resilience. Strong collaboration reduces silos, improves onboarding, and builds team trust.',
        history: 'SPACE recognizes that modern software development is inherently collaborative. This dimension captures the social and communicative aspects that traditional metrics miss.',
        benchmarks: [
            { level: 'elite', label: 'Excellent', value: '9-10' },
            { level: 'high', label: 'Good', value: '7-8.9' },
            { level: 'medium', label: 'Fair', value: '5-6.9' },
            { level: 'low', label: 'Siloed', value: '< 5' }
        ],
        benefits: [
            'Better code quality through reviews',
            'Faster onboarding of new members',
            'Knowledge sharing across team',
            'Reduced bus factor risk'
        ],
        origin: 'SPACE Framework, 2021'
    },
    'efficiency': {
        framework: 'space',
        title: 'Efficiency & Flow',
        subtitle: 'Ability to work without interruptions',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
        calculation: 'Focus time + Context switches + Wait time + Flow state duration',
        formula: 'Deep Work Hours / Total Hours × (1 - Interruption Rate)',
        significance: 'Flow state is where the best work happens. Efficiency measures how much uninterrupted time developers have for deep work. Frequent interruptions and context switches dramatically reduce productivity.',
        history: 'Based on Mihaly Csikszentmihalyi\'s Flow research and Cal Newport\'s Deep Work. SPACE includes this to highlight that productivity isn\'t just about what you do, but the conditions under which you do it.',
        benchmarks: [
            { level: 'elite', label: 'Optimal', value: '> 4 hrs/day focus' },
            { level: 'high', label: 'Good', value: '3-4 hrs/day' },
            { level: 'medium', label: 'Fragmented', value: '2-3 hrs/day' },
            { level: 'low', label: 'Disrupted', value: '< 2 hrs/day' }
        ],
        benefits: [
            'Higher quality deep work output',
            'Reduced cognitive fatigue',
            'Better developer experience',
            'Faster complex problem solving'
        ],
        origin: 'SPACE Framework, 2021'
    },
    // Additional specific metrics
    'code-churn': {
        framework: 'dora',
        title: 'Code Churn',
        subtitle: 'Code rewritten within short time period',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.66 0 3-4.03 3-9s-1.34-9-3-9m0 18c-1.66 0-3-4.03-3-9s1.34-9 3-9"/></svg>`,
        calculation: '(Lines deleted or modified within 21 days of being written ÷ Total lines changed) × 100',
        formula: 'Churn % = (Recently Modified Lines / Total Lines) × 100',
        significance: 'High code churn can indicate unclear requirements, poor initial design, or excessive rework. Some churn is healthy (refactoring), but consistently high churn suggests process issues.',
        history: 'Derived from software engineering research on rework patterns. Related to DORA\'s Change Failure Rate as high churn often correlates with deployment issues.',
        benchmarks: [
            { level: 'elite', label: 'Healthy', value: '< 15%' },
            { level: 'high', label: 'Normal', value: '15-25%' },
            { level: 'medium', label: 'Elevated', value: '25-40%' },
            { level: 'low', label: 'High Risk', value: '> 40%' }
        ],
        benefits: [
            'Identify unclear requirements early',
            'Spot technical debt accumulation',
            'Improve estimation accuracy',
            'Reduce hidden rework costs'
        ],
        origin: 'Software Engineering Research'
    },
    'flow-efficiency': {
        framework: 'space',
        title: 'Flow Efficiency',
        subtitle: 'Active time vs wait time ratio',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
        calculation: '(Active work time ÷ Total lead time) × 100',
        formula: 'Flow Efficiency = (Work Time / (Work Time + Wait Time)) × 100%',
        significance: 'Most software delivery time is spent waiting, not working. Flow efficiency reveals how much of your lead time is productive. Industry average is only 15-20%. Elite teams achieve 40%+.',
        history: 'Borrowed from Lean manufacturing (Toyota). Applied to software through Kanban methodology. Reveals hidden waste in processes.',
        benchmarks: [
            { level: 'elite', label: 'Excellent', value: '> 40%' },
            { level: 'high', label: 'Good', value: '25-40%' },
            { level: 'medium', label: 'Average', value: '15-25%' },
            { level: 'low', label: 'Poor', value: '< 15%' }
        ],
        benefits: [
            'Identify process bottlenecks',
            'Reduce wait times in pipeline',
            'Improve delivery predictability',
            'Focus improvement efforts'
        ],
        origin: 'Lean/Kanban Methodology'
    },
    'throughput': {
        framework: 'space',
        title: 'Throughput',
        subtitle: 'Work items completed per time period',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20V10M18 20V4M6 20v-4"/></svg>`,
        calculation: 'Count of completed work items (stories, tasks, bugs) per week/sprint',
        formula: 'Throughput = Completed Items / Time Period',
        significance: 'Throughput is a team-level metric showing delivery capacity. Unlike velocity, it doesn\'t require story points. Stable throughput indicates predictable delivery. Variability suggests process issues.',
        history: 'Key metric in Kanban methodology. Promoted as an alternative to velocity in agile. Part of probabilistic forecasting approaches.',
        benchmarks: [
            { level: 'elite', label: 'Stable', value: 'Low variance' },
            { level: 'high', label: 'Predictable', value: '±15% variance' },
            { level: 'medium', label: 'Variable', value: '±30% variance' },
            { level: 'low', label: 'Unpredictable', value: '> 30% variance' }
        ],
        benefits: [
            'Predictable delivery planning',
            'Better capacity management',
            'Identify team-level blockers',
            'Improve forecasting accuracy'
        ],
        origin: 'Kanban/Lean'
    },
    'pr-review-time': {
        framework: 'space',
        title: 'PR Review Time',
        subtitle: 'Time to first review on pull requests',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
        calculation: 'Time from PR opened to first substantive review comment',
        formula: 'Review Time = First Review Timestamp - PR Open Timestamp',
        significance: 'Long PR review times kill developer flow and increase lead time. Quick reviews enable faster iteration. This metric reflects team collaboration health and code review culture.',
        history: 'Emerged from DevEx research showing code review is often the biggest bottleneck in lead time. Part of SPACE\'s Communication & Collaboration dimension.',
        benchmarks: [
            { level: 'elite', label: 'Excellent', value: '< 2 hours' },
            { level: 'high', label: 'Good', value: '2-4 hours' },
            { level: 'medium', label: 'Slow', value: '4-24 hours' },
            { level: 'low', label: 'Blocker', value: '> 24 hours' }
        ],
        benefits: [
            'Faster developer feedback loops',
            'Reduced context switching',
            'Better collaboration culture',
            'Improved lead time'
        ],
        origin: 'DevEx Research'
    },
    'burnout-risk': {
        framework: 'space',
        title: 'Burnout Risk',
        subtitle: 'Indicators of unsustainable work patterns',
        icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>`,
        calculation: 'Combines: overtime hours, weekend work, declining satisfaction, reduced output',
        formula: 'Risk Score = f(Hours, Patterns, Satisfaction, Velocity Change)',
        significance: 'Burnout destroys productivity, creativity, and retention. Early detection allows intervention before it\'s too late. Sustainable pace is essential for long-term team health.',
        history: 'Based on organizational psychology research on occupational burnout. Christina Maslach\'s burnout inventory and modern workplace wellbeing studies.',
        benchmarks: [
            { level: 'elite', label: 'Low Risk', value: '< 15%' },
            { level: 'high', label: 'Monitor', value: '15-30%' },
            { level: 'medium', label: 'Elevated', value: '30-50%' },
            { level: 'low', label: 'Critical', value: '> 50%' }
        ],
        benefits: [
            'Early intervention for at-risk developers',
            'Improved retention rates',
            'Sustainable long-term performance',
            'Healthier team culture'
        ],
        origin: 'Organizational Psychology'
    }
};

// Current active filters
let currentFilters = {
    department: 'all',
    team: 'all',
    individual: 'all',
    date: '30'
};

// Sidebar Toggle
sidebarToggle.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
});

// Navigation Section Toggle - Accordion Behavior (only one open at a time)
navSectionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const sectionId = header.dataset.section;
        const content = document.getElementById(sectionId);
        const isCurrentlyExpanded = header.classList.contains('expanded');
        
        // Close all sections first
        navSectionHeaders.forEach(h => {
            h.classList.remove('expanded');
            const contentId = h.dataset.section;
            const contentEl = document.getElementById(contentId);
            if (contentEl) {
                contentEl.classList.remove('expanded');
            }
        });
        
        // If the clicked section wasn't expanded, open it
        if (!isCurrentlyExpanded) {
            header.classList.add('expanded');
            content.classList.add('expanded');
        }
    });
});

// Navigation Item Click - Page Switching (for submenu items)
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all nav items including main items
        navItems.forEach(i => i.classList.remove('active'));
        document.querySelectorAll('.nav-item-main').forEach(i => i.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        
        // Get page info
        const pageName = item.textContent.trim();
        const pageId = item.dataset.page;
        const sectionName = item.dataset.sectionName;
        
        // Update header
        pageTitle.textContent = pageName;
        breadcrumbSection.textContent = sectionName;
        breadcrumbPage.textContent = pageName;
        
        // Switch page content
        switchPage(pageId);
    });
});

// Navigation for main items (Cockpit, Team, Settings) - using event delegation
document.querySelector('.sidebar-nav').addEventListener('click', (e) => {
    const item = e.target.closest('.nav-item-main');
    if (!item) return;
    
    e.preventDefault();
    
    // Remove active class from all nav items
    navItems.forEach(i => i.classList.remove('active'));
    document.querySelectorAll('.nav-item-main').forEach(i => i.classList.remove('active'));
    
    // Add active class to clicked item
    item.classList.add('active');
    
    // Get page info
    const spanElement = item.querySelector('span');
    const pageName = spanElement ? spanElement.textContent.trim() : 'Unknown';
    const pageId = item.dataset.page;
    const sectionName = item.dataset.sectionName || pageName;
    
    // Update header
    pageTitle.textContent = pageName;
    breadcrumbSection.textContent = sectionName;
    breadcrumbPage.textContent = pageName;
    
    // Close accordion sections when navigating to main items
    document.querySelectorAll('.nav-section-content').forEach(content => {
        content.classList.remove('expanded');
    });
    document.querySelectorAll('.nav-section-header').forEach(header => {
        header.classList.remove('expanded');
    });
    
    // Switch page content
    switchPage(pageId);
});

// Navigate to page from cockpit cards
function navigateToPage(pageId) {
    // Find the nav item with this page ID
    const navItem = document.querySelector(`[data-page="${pageId}"]`);
    if (navItem) {
        navItem.click();
    }
}

function switchPage(pageId) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Initialize charts for this page
        initPageCharts(pageId);
    }
}

// Filter Dropdowns
const filterDropdowns = document.querySelectorAll('.filter-dropdown');

filterDropdowns.forEach(dropdown => {
    const btn = dropdown.querySelector('.filter-btn');
    const menu = dropdown.querySelector('.dropdown-menu');
    
    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        
        // Close other dropdowns
        filterDropdowns.forEach(d => {
            if (d !== dropdown) d.classList.remove('open');
        });
        
        dropdown.classList.toggle('open');
    });
    
    // Handle menu item selection
    const items = menu.querySelectorAll('.dropdown-item');
    items.forEach(item => {
        item.addEventListener('click', () => {
            // Update selection
            items.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            
            // Update button text
            btn.querySelector('span').textContent = item.textContent;
            
            // Update filter state
            const filterId = btn.id.replace('Filter', '');
            currentFilters[filterId] = item.dataset.value;
            
            // Close dropdown
            dropdown.classList.remove('open');
            
            // Apply filters (would refresh data in real app)
            applyFilters();
        });
    });
});

// Close dropdowns when clicking outside
document.addEventListener('click', () => {
    filterDropdowns.forEach(d => d.classList.remove('open'));
});

function applyFilters() {
    console.log('Applying filters:', currentFilters);
    // In a real app, this would fetch filtered data and update the dashboard
    // For demo, we'll just show a notification
    showNotification(`Filters applied: ${Object.entries(currentFilters).map(([k, v]) => `${k}=${v}`).join(', ')}`);
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #1f2937;
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Developer Card Selection
const developerCards = document.querySelectorAll('.developer-card');
developerCards.forEach(card => {
    card.addEventListener('click', () => {
        developerCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        
        const devId = card.dataset.dev;
        // In a real app, this would load the developer's data
        console.log('Selected developer:', devId);
    });
});

// Initialize Charts based on current page
function initPageCharts(pageId) {
    // Destroy existing charts first
    Chart.helpers.each(Chart.instances, (instance) => {
        instance.destroy();
    });
    
    switch(pageId) {
        case 'cockpit':
            // Cockpit doesn't need charts, just animations
            animateCockpitHealthScores();
            break;
        case 'team':
            // Team page - initialize mindmap
            initTeamMindmap();
            break;
        case 'investment':
            initInvestmentCharts();
            break;
        case 'work-breakdown':
            initWorkBreakdownCharts();
            break;
        case 'coding-breakdown':
            initCodingCharts();
            break;
        case 'process-flow':
            initProcessFlowCharts();
            break;
        case 'pull-requests':
            initPRCharts();
            break;
        case 'performance-insights':
            initPerformanceCharts();
            break;
        case 'team-pulse':
            initTeamPulseCharts();
            break;
    }
}

// Animate Cockpit Health Scores
function animateCockpitHealthScores() {
    document.querySelectorAll('.health-value').forEach(el => {
        const finalValue = parseInt(el.textContent);
        let current = 0;
        const increment = finalValue / 30;
        
        const animate = () => {
            current += increment;
            if (current < finalValue) {
                el.textContent = Math.round(current);
                requestAnimationFrame(animate);
            } else {
                el.textContent = finalValue;
            }
        };
        
        el.textContent = '0';
        setTimeout(animate, 100);
    });
}

// Investment Page Charts
function initInvestmentCharts() {
    const pieCtx = document.getElementById('investmentPieChart');
    const trendCtx = document.getElementById('investmentTrendChart');
    
    if (pieCtx) {
        new Chart(pieCtx, {
            type: 'doughnut',
            data: {
                labels: ['Feature Work', 'Maintenance', 'Tech Debt', 'Unplanned Work'],
                datasets: [{
                    data: [58, 16, 18, 8],
                    backgroundColor: ['#6366f1', '#10b981', '#f59e0b', '#ef4444'],
                    borderWidth: 0,
                    hoverOffset: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 16,
                            usePointStyle: true,
                            font: { family: 'Plus Jakarta Sans', size: 12 }
                        }
                    }
                }
            }
        });
    }
    
    if (trendCtx) {
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
                datasets: [
                    {
                        label: 'Feature',
                        data: [52, 55, 58, 56, 60, 58, 62, 58],
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Maintenance',
                        data: [18, 17, 16, 18, 15, 16, 14, 16],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: getLineChartOptions()
        });
    }
}

// Work Breakdown Charts
function initWorkBreakdownCharts() {
    const typeCtx = document.getElementById('workTypeChart');
    const flowCtx = document.getElementById('workFlowChart');
    
    if (typeCtx) {
        new Chart(typeCtx, {
            type: 'doughnut',
            data: {
                labels: ['Features', 'Bugs', 'Tech Debt', 'Documentation', 'Other'],
                datasets: [{
                    data: [42, 18, 22, 10, 8],
                    backgroundColor: ['#6366f1', '#ef4444', '#f59e0b', '#10b981', '#8b5cf6'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 16, usePointStyle: true }
                    }
                }
            }
        });
    }
    
    if (flowCtx) {
        new Chart(flowCtx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
                datasets: [
                    {
                        label: 'Created',
                        data: [12, 28, 45, 62, 78, 95, 118, 142, 165, 188],
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Completed',
                        data: [8, 22, 38, 55, 72, 88, 108, 132, 158, 180],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: getLineChartOptions()
        });
    }
}

// Coding Breakdown Charts
function initCodingCharts() {
    const activityCtx = document.getElementById('codingActivityChart');
    
    if (activityCtx) {
        new Chart(activityCtx, {
            type: 'doughnut',
            data: {
                labels: ['New Code', 'Code Review', 'Refactoring', 'Bug Fixes', 'Testing'],
                datasets: [{
                    data: [45, 20, 15, 12, 8],
                    backgroundColor: ['#6366f1', '#8b5cf6', '#10b981', '#ef4444', '#f59e0b'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 16, usePointStyle: true }
                    }
                }
            }
        });
    }
    
    // Generate heatmap
    generateCommitHeatmap();
}

function generateCommitHeatmap() {
    const heatmap = document.getElementById('commitHeatmap');
    if (!heatmap) return;
    
    heatmap.innerHTML = '';
    
    // Create 7 days x 24 hours heatmap
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    for (let day = 0; day < 7; day++) {
        const row = document.createElement('div');
        row.style.cssText = 'display: flex; gap: 4px; margin-bottom: 4px; align-items: center;';
        
        const label = document.createElement('span');
        label.textContent = days[day];
        label.style.cssText = 'width: 40px; font-size: 11px; color: #6b7280;';
        row.appendChild(label);
        
        for (let hour = 0; hour < 24; hour++) {
            const cell = document.createElement('div');
            const intensity = Math.random();
            let color = '#f3f4f6';
            
            if (intensity > 0.8) color = '#6366f1';
            else if (intensity > 0.6) color = '#818cf8';
            else if (intensity > 0.4) color = '#a5b4fc';
            else if (intensity > 0.2) color = '#c7d2fe';
            
            // Less activity on weekends
            if (day >= 5 && Math.random() > 0.3) color = '#f3f4f6';
            
            // Less activity at night
            if ((hour < 8 || hour > 20) && Math.random() > 0.2) color = '#f3f4f6';
            
            cell.style.cssText = `
                width: 16px;
                height: 16px;
                border-radius: 3px;
                background: ${color};
                transition: transform 0.2s;
                cursor: pointer;
            `;
            cell.title = `${days[day]} ${hour}:00 - ${hour + 1}:00`;
            cell.addEventListener('mouseenter', () => cell.style.transform = 'scale(1.2)');
            cell.addEventListener('mouseleave', () => cell.style.transform = 'scale(1)');
            row.appendChild(cell);
        }
        heatmap.appendChild(row);
    }
}

// Process Flow Charts
function initProcessFlowCharts() {
    const leadTimeCtx = document.getElementById('leadTimeChart');
    const flowEffCtx = document.getElementById('flowEfficiencyChart');
    
    if (leadTimeCtx) {
        new Chart(leadTimeCtx, {
            type: 'bar',
            data: {
                labels: ['Development', 'Code Review', 'Testing', 'Staging', 'Production'],
                datasets: [{
                    label: 'Time (minutes)',
                    data: [45, 52, 28, 15, 4],
                    backgroundColor: ['#6366f1', '#f59e0b', '#6366f1', '#6366f1', '#10b981'],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#f3f4f6' },
                        ticks: { font: { family: 'Plus Jakarta Sans' } }
                    },
                    x: {
                        grid: { display: false },
                        ticks: { font: { family: 'Plus Jakarta Sans' } }
                    }
                }
            }
        });
    }
    
    if (flowEffCtx) {
        new Chart(flowEffCtx, {
            type: 'line',
            data: {
                labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
                datasets: [{
                    label: 'Flow Efficiency %',
                    data: [58, 62, 65, 60, 68, 72, 70, 68],
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#6366f1',
                    pointRadius: 4
                }]
            },
            options: getLineChartOptions()
        });
    }
}

// PR Charts
function initPRCharts() {
    const sizeCtx = document.getElementById('prSizeChart');
    const trendCtx = document.getElementById('prTrendChart');
    
    if (sizeCtx) {
        new Chart(sizeCtx, {
            type: 'doughnut',
            data: {
                labels: ['Small (<100 lines)', 'Medium (100-500)', 'Large (500-1000)', 'XL (>1000)'],
                datasets: [{
                    data: [45, 32, 18, 5],
                    backgroundColor: ['#10b981', '#6366f1', '#f59e0b', '#ef4444'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '65%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { padding: 16, usePointStyle: true }
                    }
                }
            }
        });
    }
    
    if (trendCtx) {
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'],
                datasets: [
                    {
                        label: 'Opened',
                        data: [42, 48, 55, 52, 60, 58, 65, 62],
                        borderColor: '#6366f1',
                        tension: 0.4
                    },
                    {
                        label: 'Merged',
                        data: [38, 45, 52, 50, 58, 55, 62, 60],
                        borderColor: '#10b981',
                        tension: 0.4
                    },
                    {
                        label: 'Closed',
                        data: [2, 3, 2, 4, 3, 2, 3, 2],
                        borderColor: '#ef4444',
                        tension: 0.4
                    }
                ]
            },
            options: getLineChartOptions()
        });
    }
}

// Performance Charts
function initPerformanceCharts() {
    const trendCtx = document.getElementById('performanceTrendChart');
    
    if (trendCtx) {
        new Chart(trendCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'DORA Score',
                        data: [72, 75, 78, 76, 80, 82, 85, 84, 88, 86, 89, 92],
                        borderColor: '#3b82f6',
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#3b82f6',
                        pointRadius: 4
                    },
                    {
                        label: 'SPACE Score',
                        data: [78, 76, 80, 82, 79, 84, 86, 88, 85, 89, 90, 88],
                        borderColor: '#8b5cf6',
                        backgroundColor: 'rgba(139, 92, 246, 0.1)',
                        fill: true,
                        tension: 0.4,
                        pointBackgroundColor: '#8b5cf6',
                        pointRadius: 4
                    }
                ]
            },
            options: getLineChartOptions()
        });
    }
}

// Team Pulse Charts
function initTeamPulseCharts() {
    const satisfactionCtx = document.getElementById('satisfactionTrendChart');
    const workLifeCtx = document.getElementById('workLifeChart');
    
    if (satisfactionCtx) {
        new Chart(satisfactionCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [
                    {
                        label: 'Platform',
                        data: [8.5, 8.7, 8.9, 8.8, 9.0, 8.9],
                        borderColor: '#6366f1',
                        tension: 0.4
                    },
                    {
                        label: 'Frontend',
                        data: [8.0, 7.8, 8.2, 8.0, 8.4, 8.2],
                        borderColor: '#10b981',
                        tension: 0.4
                    },
                    {
                        label: 'Backend',
                        data: [7.8, 7.5, 7.2, 6.8, 7.0, 7.4],
                        borderColor: '#f59e0b',
                        tension: 0.4
                    },
                    {
                        label: 'DevOps',
                        data: [8.8, 9.0, 8.9, 9.2, 9.0, 9.1],
                        borderColor: '#06b6d4',
                        tension: 0.4
                    }
                ]
            },
            options: {
                ...getLineChartOptions(),
                scales: {
                    y: {
                        min: 5,
                        max: 10,
                        grid: { color: '#f3f4f6' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }
    
    if (workLifeCtx) {
        new Chart(workLifeCtx, {
            type: 'bar',
            data: {
                labels: ['<40 hrs', '40-45 hrs', '45-50 hrs', '>50 hrs'],
                datasets: [{
                    label: 'Team Members',
                    data: [8, 12, 6, 3],
                    backgroundColor: ['#10b981', '#6366f1', '#f59e0b', '#ef4444'],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#f3f4f6' }
                    },
                    x: { grid: { display: false } }
                }
            }
        });
    }
}

// Common line chart options
function getLineChartOptions() {
    return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    padding: 16,
                    usePointStyle: true,
                    font: { family: 'Plus Jakarta Sans', size: 12 }
                }
            },
            tooltip: {
                backgroundColor: '#1f2937',
                titleColor: '#fff',
                bodyColor: '#fff',
                padding: 12,
                cornerRadius: 8
            }
        },
        scales: {
            x: {
                grid: { display: false },
                ticks: { font: { family: 'Plus Jakarta Sans' } }
            },
            y: {
                grid: { color: '#f3f4f6', drawBorder: false },
                ticks: { font: { family: 'Plus Jakarta Sans' } }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        }
    };
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Initialize charts for the default page (Cockpit)
    initPageCharts('cockpit');
    
    // Animate metrics on scroll
    animateOnScroll();
    
    // Initialize team mindmap expand/collapse
    initTeamMindmap();
});

// Team Mindmap Expand/Collapse
function initTeamMindmap() {
    document.querySelectorAll('.node-expand').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const teamId = btn.dataset.team;
            const membersContainer = document.getElementById(`${teamId}-members`);
            
            if (membersContainer) {
                membersContainer.classList.toggle('collapsed');
                btn.classList.toggle('expanded');
            }
        });
    });
    
    // Mindmap view controls
    document.querySelectorAll('.control-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            // Future: implement different view modes
        });
    });
}

// Intersection Observer for animations
function animateOnScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.metric-card, .chart-container, .goal-card, .alert-item, .comparison-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(el);
    });
}

// Export button functionality
document.querySelectorAll('.btn-secondary').forEach(btn => {
    if (btn.textContent.includes('Export')) {
        btn.addEventListener('click', () => {
            const originalContent = btn.innerHTML;
            btn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 1s linear infinite;">
                    <circle cx="12" cy="12" r="10"></circle>
                </svg>
                Exporting...
            `;
            btn.disabled = true;
            
            setTimeout(() => {
                btn.innerHTML = `
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                    Exported!
                `;
                
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.disabled = false;
                }, 1500);
            }, 1500);
        });
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
    @keyframes slideIn {
        from { opacity: 0; transform: translateX(20px); }
        to { opacity: 1; transform: translateX(0); }
    }
`;
document.head.appendChild(style);

// ==========================================
// METRIC TOOLTIP SYSTEM
// ==========================================

// Create global tooltip element
const tooltipElement = document.createElement('div');
tooltipElement.className = 'metric-tooltip';
tooltipElement.id = 'metricTooltip';
document.body.appendChild(tooltipElement);

let activeTooltipBtn = null;

// Generate tooltip HTML content
function generateTooltipHTML(metricKey) {
    const metric = metricDefinitions[metricKey];
    if (!metric) return '';
    
    const benchmarksHTML = metric.benchmarks.map(b => `
        <div class="benchmark-item">
            <span class="benchmark-dot ${b.level}"></span>
            <span class="benchmark-label">${b.label}</span>
            <span class="benchmark-value">${b.value}</span>
        </div>
    `).join('');
    
    const benefitsHTML = metric.benefits.map(b => `
        <div class="benefit-item">
            <span class="benefit-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
            </span>
            <span>${b}</span>
        </div>
    `).join('');
    
    return `
        <div class="tooltip-header">
            <div class="tooltip-icon ${metric.framework}">
                ${metric.icon}
            </div>
            <div class="tooltip-title-area">
                <div class="tooltip-title">
                    ${metric.title}
                    <span class="tooltip-framework ${metric.framework}">${metric.framework.toUpperCase()}</span>
                </div>
                <div class="tooltip-subtitle">${metric.subtitle}</div>
            </div>
            <button class="tooltip-close" onclick="hideTooltip()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        <div class="tooltip-body">
            <div class="tooltip-section">
                <div class="tooltip-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    What is it?
                </div>
                <div class="tooltip-section-content">
                    ${metric.significance}
                </div>
            </div>
            
            <div class="tooltip-section">
                <div class="tooltip-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M12 20V10M18 20V4M6 20v-4"></path>
                    </svg>
                    How it's calculated
                </div>
                <div class="tooltip-section-content">
                    ${metric.calculation}
                    <div class="tooltip-formula">
                        <code>${metric.formula}</code>
                    </div>
                </div>
            </div>
            
            <div class="tooltip-section">
                <div class="tooltip-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    Performance benchmarks
                </div>
                <div class="tooltip-benchmarks">
                    ${benchmarksHTML}
                </div>
            </div>
            
            <div class="tooltip-section">
                <div class="tooltip-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 010 7.75"></path>
                    </svg>
                    How it helps your team
                </div>
                <div class="tooltip-benefits">
                    ${benefitsHTML}
                </div>
            </div>
            
            <div class="tooltip-section">
                <div class="tooltip-section-title">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    History & Origin
                </div>
                <div class="tooltip-section-content">
                    ${metric.history}
                </div>
            </div>
        </div>
        <div class="tooltip-footer">
            <span class="tooltip-origin">Source: <strong>${metric.origin}</strong></span>
            <span class="tooltip-learn-more" onclick="learnMore('${metricKey}')">
                Learn more
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
            </span>
        </div>
    `;
}

// Show tooltip
function showTooltip(btn, metricKey) {
    const tooltip = document.getElementById('metricTooltip');
    
    // Generate content
    tooltip.innerHTML = generateTooltipHTML(metricKey);
    
    // Position tooltip
    const btnRect = btn.getBoundingClientRect();
    const tooltipWidth = 380;
    const tooltipHeight = tooltip.offsetHeight || 450;
    
    let left = btnRect.left;
    let top = btnRect.bottom + 12;
    
    // Adjust if tooltip goes off right edge
    if (left + tooltipWidth > window.innerWidth - 20) {
        left = window.innerWidth - tooltipWidth - 20;
        tooltip.classList.add('position-left');
    } else {
        tooltip.classList.remove('position-left');
    }
    
    // Adjust if tooltip goes off bottom
    if (top + tooltipHeight > window.innerHeight - 20) {
        top = btnRect.top - tooltipHeight - 12;
        tooltip.classList.add('position-top');
    } else {
        tooltip.classList.remove('position-top');
    }
    
    tooltip.style.left = `${left}px`;
    tooltip.style.top = `${top}px`;
    
    // Show tooltip
    tooltip.classList.add('visible');
    activeTooltipBtn = btn;
}

// Hide tooltip
function hideTooltip() {
    const tooltip = document.getElementById('metricTooltip');
    tooltip.classList.remove('visible');
    activeTooltipBtn = null;
}

// Learn more link handler
function learnMore(metricKey) {
    const urls = {
        'deployment-frequency': 'https://dora.dev/guides/dora-metrics-four-keys/',
        'lead-time': 'https://dora.dev/guides/dora-metrics-four-keys/',
        'change-failure-rate': 'https://dora.dev/guides/dora-metrics-four-keys/',
        'mttr': 'https://dora.dev/guides/dora-metrics-four-keys/',
        'satisfaction': 'https://queue.acm.org/detail.cfm?id=3454124',
        'performance': 'https://queue.acm.org/detail.cfm?id=3454124',
        'activity': 'https://queue.acm.org/detail.cfm?id=3454124',
        'collaboration': 'https://queue.acm.org/detail.cfm?id=3454124',
        'efficiency': 'https://queue.acm.org/detail.cfm?id=3454124'
    };
    
    const url = urls[metricKey] || 'https://dora.dev';
    window.open(url, '_blank');
}

// Close tooltip when clicking outside
document.addEventListener('click', (e) => {
    const tooltip = document.getElementById('metricTooltip');
    if (!tooltip.contains(e.target) && !e.target.closest('.metric-info-btn')) {
        hideTooltip();
    }
});

// Close tooltip on scroll
document.addEventListener('scroll', hideTooltip, true);

// Add info buttons to all framework tags after page load
function addInfoButtonsToTags() {
    // Map framework tags to their metric keys based on context
    const tagMappings = {
        // DORA mappings
        'Deployment Frequency': 'deployment-frequency',
        'Deploy Freq': 'deployment-frequency',
        'Lead Time': 'lead-time',
        'Delivery Lead Time': 'lead-time',
        'Lead Time for Changes': 'lead-time',
        'Change Failure Rate': 'change-failure-rate',
        'Failure Rate': 'change-failure-rate',
        'Mean Time to Restore': 'mttr',
        'MTTR': 'mttr',
        'Code Churn': 'code-churn',
        'Throughput': 'throughput',
        // SPACE mappings
        'Satisfaction': 'satisfaction',
        'Satisfaction & Well-Being': 'satisfaction',
        'Overall Satisfaction': 'satisfaction',
        'Team Satisfaction': 'satisfaction',
        'Performance': 'performance',
        'Overall Performance': 'performance',
        'Activity': 'activity',
        'Coding Activity': 'activity',
        'Active Coding Time': 'activity',
        'Collaboration': 'collaboration',
        'Communication & Collaboration': 'collaboration',
        'Collaboration Score': 'collaboration',
        'Efficiency': 'efficiency',
        'Efficiency & Flow': 'efficiency',
        'Flow Efficiency': 'flow-efficiency',
        'Team Efficiency': 'efficiency',
        'Focus Score': 'efficiency',
        'Burnout Risk': 'burnout-risk',
        'Workload Balance': 'satisfaction',
        // PR related
        'Avg Review Time': 'pr-review-time',
        'PR Review Time': 'pr-review-time'
    };
    
    // Find all metric cards and headers with framework tags
    document.querySelectorAll('.metric-header, .chart-header, .goal-header, .space-dimensions h3, .dora-contribution h3, .table-header h3').forEach(header => {
        const tag = header.querySelector('.framework-tag');
        if (!tag || header.querySelector('.metric-info-btn')) return; // Already has button
        
        // Find the metric label
        const labelEl = header.querySelector('.metric-label') || header.querySelector('h3') || header.querySelector('h4');
        if (!labelEl) return;
        
        const labelText = labelEl.textContent.trim();
        
        // Find matching metric key
        let metricKey = null;
        for (const [pattern, key] of Object.entries(tagMappings)) {
            if (labelText.includes(pattern) || pattern.includes(labelText)) {
                metricKey = key;
                break;
            }
        }
        
        // Default to framework generic info if no specific match
        if (!metricKey) {
            const framework = tag.classList.contains('dora') ? 'deployment-frequency' : 'satisfaction';
            metricKey = framework;
        }
        
        // Wrap tag in container and add info button
        const wrapper = document.createElement('span');
        wrapper.className = 'metric-info-wrapper';
        tag.parentNode.insertBefore(wrapper, tag);
        wrapper.appendChild(tag);
        
        const infoBtn = document.createElement('button');
        infoBtn.className = 'metric-info-btn';
        infoBtn.setAttribute('data-metric', metricKey);
        infoBtn.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
        `;
        infoBtn.title = 'Click to learn about this metric';
        wrapper.appendChild(infoBtn);
        
        // Add click handler
        infoBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (activeTooltipBtn === infoBtn) {
                hideTooltip();
            } else {
                showTooltip(infoBtn, metricKey);
            }
        });
    });
}

// Initialize info buttons when page loads and on page switch
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(addInfoButtonsToTags, 100);
});

// Re-add info buttons when switching pages
const originalSwitchPage = switchPage;
switchPage = function(pageId) {
    originalSwitchPage(pageId);
    setTimeout(addInfoButtonsToTags, 100);
};

// Mobile menu
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
        if (!sidebar.contains(e.target) && sidebar.classList.contains('open')) {
            sidebar.classList.remove('open');
        }
    }
});

// Handle resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('open');
    }
});

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================

const notificationBtn = document.getElementById('notificationBtn');
const notificationDropdown = document.getElementById('notificationDropdown');
const toggleBtns = document.querySelectorAll('.notification-toggle .toggle-btn');
const updatesTab = document.getElementById('updatesTab');
const alertsTab = document.getElementById('alertsTab');

// Toggle notification dropdown
if (notificationBtn && notificationDropdown) {
    notificationBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationDropdown.classList.toggle('open');
        notificationBtn.classList.toggle('active');
    });
}

// Handle tab switching
toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active from all buttons
        toggleBtns.forEach(b => b.classList.remove('active'));
        // Add active to clicked button
        btn.classList.add('active');
        
        // Switch tabs
        const tab = btn.getAttribute('data-tab');
        if (tab === 'updates') {
            updatesTab.classList.remove('hidden');
            alertsTab.classList.add('hidden');
        } else {
            updatesTab.classList.add('hidden');
            alertsTab.classList.remove('hidden');
        }
    });
});

// Close notification dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (notificationDropdown && !notificationDropdown.contains(e.target) && !notificationBtn.contains(e.target)) {
        notificationDropdown.classList.remove('open');
        notificationBtn.classList.remove('active');
    }
});

// Mark all as read functionality
const markReadBtn = document.querySelector('.mark-read-btn');
if (markReadBtn) {
    markReadBtn.addEventListener('click', () => {
        const unreadItems = document.querySelectorAll('.notification-item.unread');
        unreadItems.forEach(item => {
            item.classList.remove('unread');
            const dot = item.querySelector('.unread-dot');
            if (dot) dot.remove();
        });
        
        // Update badge count
        const badge = document.querySelector('.notification-badge');
        if (badge) {
            badge.textContent = '0';
            badge.style.display = 'none';
        }
    });
}

// Notification item click handler
const notificationItems = document.querySelectorAll('.notification-item');
notificationItems.forEach(item => {
    item.addEventListener('click', () => {
        // Remove unread state
        item.classList.remove('unread');
        const dot = item.querySelector('.unread-dot');
        if (dot) dot.remove();
        
        // Navigate based on content (if it's an alert)
        if (item.classList.contains('alert-critical') || item.classList.contains('alert-warning')) {
            navigateToPage('alerts');
            notificationDropdown.classList.remove('open');
            notificationBtn.classList.remove('active');
        }
    });
});

// ==========================================
// SETTINGS PAGE TAB SWITCHING
// ==========================================

const settingsTabs = document.querySelectorAll('.settings-tab');
const settingsContents = document.querySelectorAll('.settings-content');

settingsTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-settings-tab');
        
        // Remove active from all tabs
        settingsTabs.forEach(t => t.classList.remove('active'));
        // Add active to clicked tab
        tab.classList.add('active');
        
        // Hide all content
        settingsContents.forEach(content => content.classList.remove('active'));
        // Show target content
        const targetContent = document.getElementById(`settings-${targetTab}`);
        if (targetContent) {
            targetContent.classList.add('active');
        }
    });
});

// Settings nav functionality is handled by the main .nav-item-main event delegation handler above

// Reset to defaults function
function resetToDefaults(type) {
    if (type === 'dora') {
        // Reset DORA metrics to research defaults
        const doraDefaults = {
            'df-elite': 'Multiple per day',
            'df-high': '1 per week',
            'df-medium': '1 per month',
            'df-low': '< 1 per month',
            'lt-elite': '< 1 hour',
            'lt-high': '1 day - 1 week',
            'lt-medium': '1 week - 1 month',
            'lt-low': '> 1 month',
            'cfr-elite': 15,
            'cfr-high': 30,
            'cfr-medium': 45,
            'cfr-low': 46,
            'mttr-elite': '< 1 hour',
            'mttr-high': '< 1 day',
            'mttr-medium': '< 1 week',
            'mttr-low': '> 1 week'
        };
        
        Object.entries(doraDefaults).forEach(([metric, value]) => {
            const input = document.querySelector(`[data-metric="${metric}"]`);
            if (input) {
                input.value = value;
            }
        });
        
        // Show confirmation
        showToast('DORA metrics reset to research defaults');
    }
}

// Toast notification for settings
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'settings-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 24px;
        right: 24px;
        background: var(--gray-800);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        box-shadow: 0 4px 20px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideUp 0.3s ease;
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);

console.log('🚀 Engineering Manager Dashboard initialized');
console.log('📊 DORA Metrics: Deployment Frequency, Lead Time, Change Failure Rate, MTTR');
console.log('🎯 SPACE Metrics: Satisfaction, Performance, Activity, Collaboration, Efficiency');
console.log('🔔 Notification system enabled');
console.log('⚙️ Settings page enabled');
