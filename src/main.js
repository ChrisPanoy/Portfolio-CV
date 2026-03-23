import './style.css'

/**
 * CHRISYSTEMATIXX_OS CORE LOGIC
 * Pure Vanilla JavaScript Module
 */

// 1. BOOT SEQUENCE
const runBootLoader = async () => {
    const progress = document.getElementById('boot-progress');
    const status = document.getElementById('boot-status');
    const loader = document.getElementById('boot-loader');
    const desktop = document.getElementById('desktop');

    const steps = [
        { progress: 20, text: 'LOADING_KERNEL_V4.2' },
        { progress: 45, text: 'MOUNTING_DEVICES' },
        { progress: 70, text: 'ESTABLISHING_SECURE_LINK' },
        { progress: 90, text: 'LOAD_UI_MODULES' },
        { progress: 100, text: 'SYSTEM_STABLE' }
    ];

    for (const step of steps) {
        await new Promise(r => setTimeout(r, 600 + Math.random() * 400));
        progress.style.width = `${step.progress}%`;
        status.textContent = step.text;
    }

    await new Promise(r => setTimeout(r, 500));
    loader.style.opacity = '0';
    loader.style.pointerEvents = 'none';

    desktop.classList.remove('opacity-0');
    desktop.classList.add('opacity-100');

    // Trigger initial reveal
    switchSection('home');
};

// 2. WINDOW / SECTION SWITCHING
const switchSection = (sectionId) => {
    const sections = document.querySelectorAll('#workspace section');
    const navBtns = document.querySelectorAll('.nav-btn');

    sections.forEach(sec => {
        if (sec.dataset.id === sectionId) {
            sec.classList.add('active');
            sec.style.zIndex = '10';
        } else {
            sec.classList.remove('active');
            setTimeout(() => {
                if (!sec.classList.contains('active')) {
                    sec.style.zIndex = '0';
                }
            }, 600);
        }
    });

    // Update Nav active state
    navBtns.forEach(btn => {
        if (btn.dataset.section === sectionId) {
            btn.querySelector('ion-icon').classList.replace('text-slate-600', 'text-sys-cyan');
        } else {
            btn.querySelector('ion-icon').classList.replace('text-sys-cyan', 'text-slate-600');
        }
    });
};

// 3. DIGITAL HUD CLOCK
const startClock = () => {
    const clockEl = document.getElementById('digital-clock');
    setInterval(() => {
        const now = new Date();
        // 12-hour format with AM/PM
        clockEl.textContent = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        }).toUpperCase();
    }, 1000);
};

// 4. EVENT LISTENERS
const initListeners = () => {
    // Nav Buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.section;
            switchSection(target);
        });
    });

    // Internal Target Buttons (Links within windows)
    document.querySelectorAll('[data-target]').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            switchSection(target);
        });
    });
};

// 5. MOTION & STAGGER INIT
const initMotion = () => {
    document.querySelectorAll('.window').forEach(win => {
        win.querySelectorAll('.stagger-item').forEach((item, index) => {
            // High-performance delay allocation
            item.style.transitionDelay = `${index * 80}ms`;
        });
    });
};

// 6. ASSET VIEWER MODULE
window.openCertificateViewer = (title, images) => {
    const viewer = document.getElementById('cert-viewer');
    const titleEl = document.getElementById('cert-viewer-title');
    const contentEl = document.getElementById('cert-viewer-content');
    const countEl = document.getElementById('cert-viewer-count');

    titleEl.textContent = `ASSET_VAULT // ${title.toUpperCase()}.DAT`;
    countEl.textContent = `FILES_LOGGED: ${String(images.length).padStart(2, '0')}`;

    // Inject and setup animations
    contentEl.innerHTML = images.map((src, i) => `
        <div class="group relative border border-white/5 bg-black/40 overflow-hidden flex flex-col items-center justify-center p-4 hover:border-sys-cyan/30 transition-all opacity-0 translate-y-4" style="transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1); transition-delay: ${i * 100}ms">
            <div class="absolute top-2 left-2 mono text-[8px] text-slate-700">PTR_${i + 1}</div>
            <img src="${src}" class="max-w-full max-h-[50vh] object-contain grayscale hover:grayscale-0 transition-all duration-700 hover:scale-110" />
            <div class="absolute inset-0 bg-sys-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
            <div class="mt-4 mono text-[6px] text-slate-600 uppercase">Buffer_Asset_${i + 1}</div>
        </div>
    `).join('');

    viewer.classList.remove('opacity-0', 'pointer-events-none');

    // Trigger reveal
    setTimeout(() => {
        contentEl.querySelectorAll('div').forEach(item => {
            item.classList.remove('opacity-0', 'translate-y-4');
            item.classList.add('opacity-100', 'translate-y-0');
        });
    }, 50);
};

window.closeCertViewer = () => {
    const viewer = document.getElementById('cert-viewer');
    viewer.classList.add('opacity-0', 'pointer-events-none');
};

// INITIALIZE SYSTEM
document.addEventListener('DOMContentLoaded', () => {
    runBootLoader();
    startClock();
    initListeners();
    initMotion();
});
