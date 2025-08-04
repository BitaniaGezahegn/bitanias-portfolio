// Performance optimization utilities
(function() {
    // Create a global performance settings object
    window.performanceSettings = {
        isLowEndDevice: false,
        reducedMotion: false,
        isInitialized: false
    };

    // Initialize performance detection
    function initPerformanceDetection() {
        if (window.performanceSettings.isInitialized) return;
        
        // Check for reduced motion preference
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        // Check for low-end device indicators
        const isLowEndDevice = detectLowEndDevice();
        
        // Set global performance settings
        window.performanceSettings.isLowEndDevice = isLowEndDevice;
        window.performanceSettings.reducedMotion = reducedMotion;
        window.performanceSettings.isInitialized = true;
        
        // Apply performance optimizations
        if (isLowEndDevice || reducedMotion) {
            applyLowEndOptimizations();
        }
        
        // Log performance settings
        console.log('Performance settings:', window.performanceSettings);
    }
    
    // Detect if the device is likely a low-end device
    function detectLowEndDevice() {
        // Check for navigator.deviceMemory (Chrome, Edge, Opera)
        if (navigator.deviceMemory && navigator.deviceMemory <= 4) {
            return true;
        }
        
        // Check for navigator.hardwareConcurrency (number of logical processors)
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
            return true;
        }
        
        // Check for mobile devices which are more likely to be low-end
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        // Additional heuristic: check if the device is mobile and has a low pixel ratio
        if (isMobile && window.devicePixelRatio <= 1) {
            return true;
        }
        
        return false;
    }
    
    // Apply optimizations for low-end devices
    function applyLowEndOptimizations() {
        // Add a class to the body for CSS-based optimizations
        document.body.classList.add('low-end-device');
        
        // Disable certain animations via CSS
        const style = document.createElement('style');
        style.textContent = `
            .low-end-device .floating,
            .low-end-device .pulse,
            .low-end-device h1,
            .low-end-device .bounce {
                animation: none !important;
            }
            
            .low-end-device .gradient-bg {
                animation: none !important;
                background: rgba(106, 226, 255, 0.02) !important;
            }
            
            .low-end-device .particles-container {
                display: none !important;
            }
            
            .low-end-device .fade-in,
            .low-end-device .fade-in-up {
                opacity: 1 !important;
                transform: none !important;
                transition: none !important;
            }
            
            .low-end-device .btn:hover,
            .low-end-device .hero-social-icons a:hover,
            .low-end-device .service-card:hover,
            .low-end-device .project-card:hover,
            .low-end-device .benefit-card:hover {
                transform: none !important;
                box-shadow: none !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPerformanceDetection);
    } else {
        initPerformanceDetection();
    }
})();
