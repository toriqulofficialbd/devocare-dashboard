

const Loader = () => {
  return (
    
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white border border-white/50 shadow-2xl max-w-[160px] w-full aspect-square">
      
      {/* Pure CSS Dual-Ring Spinner Loop */}
      <div className="relative w-12 h-12">
        {/* Static under-ring spacer track */}
        <div className="absolute inset-0 rounded-full border-4 border-slate-100" />
        
        {/* Active rolling indicator loop */}
        <div className="absolute inset-0 rounded-full border-4 border-t-violet-600 border-r-transparent border-b-transparent border-l-transparent animate-spin [animation-duration:0.8s] ease-in-out" />
      </div>
      
      {/* Minimalist modern tracking status label */}
      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-5 animate-pulse">
        Loading
      </span>
      
    </div>
  );
};

export default Loader;
