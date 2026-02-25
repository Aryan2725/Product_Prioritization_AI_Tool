
import { useState, useMemo } from 'react';
import Head from 'next/head';
import { Sliders, BrainCircuit, Trophy } from 'lucide-react';

const getImpactLabel = (impactValue: any) => {
  if (impactValue >= 3) return 'Massive';
  if (impactValue >= 2) return 'High';
  if (impactValue >= 1) return 'Medium';
  if (impactValue >= 0.5) return 'Low';
  return 'Minimal';
};

// Placeholder for FeatureCard and PRDModal components
const FeatureCard = ({ feature, onChange, isTopPriority, onGeneratePRD }) => (
  <div className={`p-6 rounded-lg shadow-lg transition-all duration-300 ${isTopPriority ? 'bg-emerald-900/50 ring-2 ring-emerald-500' : 'bg-slate-800'}`}>
    <div className="flex justify-between items-center mb-4">
      <input
        type="text"
        value={feature.name}
        onChange={(e) => onChange(feature.id, 'name', e.target.value)}
        placeholder="Feature/Project Idea"
        className="text-xl font-bold bg-black/20 px-2 rounded-t-md border-b-2 border-slate-600 focus:outline-none focus:border-indigo-500 flex-grow"
      />
      {isTopPriority && (
        <div className="flex items-center gap-2 text-emerald-400 ml-4">
          <Trophy size={24} />
          <span className="font-semibold">Top Priority</span>
        </div>
      )}
    </div>
    
    {/* Sliders */}
    <div className="space-y-6">
      <div>
        <label className="flex justify-between text-slate-400"><span>Reach</span><span>{feature.reach.toLocaleString()} users</span></label>
        <input type="range" min="100" max="10000" step="100" value={feature.reach} onChange={(e) => onChange(feature.id, 'reach', parseInt(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
      </div>
      <div>
        <label className="flex justify-between text-slate-400">
          <span>Impact</span>
          <span>{feature.impact} - {getImpactLabel(feature.impact)}</span>
        </label>
        <input type="range" min="0.25" max="3" step="0.25" value={feature.impact} onChange={(e) => onChange(feature.id, 'impact', parseFloat(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
      </div>
      <div>
        <label className="flex justify-between text-slate-400"><span>Confidence</span><span>{feature.confidence}%</span></label>
        <input type="range" min="50" max="100" step="1" value={feature.confidence} onChange={(e) => onChange(feature.id, 'confidence', parseInt(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
      </div>
      <div>
        <label className="flex justify-between text-slate-400"><span>Effort</span><span>{feature.effort} months</span></label>
        <input type="range" min="1" max="5" step="0.5" value={feature.effort} onChange={(e) => onChange(feature.id, 'effort', parseFloat(e.target.value))} className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
      </div>
    </div>

    {/* Score and PRD Button */}
    <div className="mt-8 flex justify-between items-center">
      <div>
        <span className="text-slate-400 text-sm">RICE Score</span>
        <p className="text-3xl font-bold text-indigo-400">{Math.round(feature.score)}</p>
      </div>
      {isTopPriority && (
        <button
          onClick={() => onGeneratePRD(feature)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition-all shadow-md hover:shadow-lg"
        >
          <BrainCircuit size={20} />
          <span>Generate Mini-PRD</span>
        </button>
      )}
    </div>
  </div>
);

const PRDModal = ({ feature, onClose }) => {
  if (!feature) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 max-w-2xl w-full border border-slate-700">
        <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-indigo-400">Mini-PRD: {feature.name}</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-white">&times;</button>
        </div>
        <div className="space-y-6 text-slate-300">
          <div>
            <h3 className="font-semibold text-lg text-slate-200 mb-2">Problem</h3>
            <p>Users need a way to achieve [User Goal] because they are currently struggling with [Problem]. This causes [Negative Impact]. Our feature, "{feature.name}," aims to solve this by providing a clear and efficient solution.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-200 mb-2">Solution</h3>
            <p>"{feature.name}" will be a [Feature Description] that allows users to [Action/Benefit]. It will integrate seamlessly into the existing workflow, and provide [Value Proposition]. We will build it using [Technology/Approach], ensuring a robust and scalable solution.</p>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-slate-200 mb-2">Key Metrics</h3>
            <ul className="list-disc list-inside space-y-1">
              <li>Adoption Rate: Target 20% of active users within the first month.</li>
              <li>Engagement: At least 50% of users who adopt the feature use it weekly.</li>
              <li>User Satisfaction: Achieve a CSAT score of 4.5/5 or higher for the feature.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


export default function Home() {
  const [features, setFeatures] = useState([
    { id: 1, name: 'AI-Powered Code Suggestions', reach: 5000, impact: 2, confidence: 80, effort: 3, score: 0 },
    { id: 2, name: 'Real-time Collaboration', reach: 8000, impact: 2.5, confidence: 90, effort: 4, score: 0 },
    { id: 3, name: 'Gamified Learning Modules', reach: 3000, impact: 1.5, confidence: 70, effort: 2, score: 0 },
  ]);
  const [modalFeature, setModalFeature] = useState(null);

  const calculateRiceScore = (feature) => {
    if (feature.effort === 0) return 0;
    return (feature.reach * feature.impact * (feature.confidence / 100)) / feature.effort;
  };

  const updatedFeatures = useMemo(() => {
    return features.map(f => ({ ...f, score: calculateRiceScore(f) }));
  }, [features]);

  const topFeatureId = useMemo(() => {
    if (updatedFeatures.length === 0) return null;
    return updatedFeatures.reduce((prev, current) => (prev.score > current.score) ? prev : current).id;
  }, [updatedFeatures]);

  const handleFeatureChange = (id, field, value) => {
    setFeatures(prevFeatures =>
      prevFeatures.map(f => (f.id === id ? { ...f, [field]: value } : f))
    );
  };
  
  const handleGeneratePRD = (feature) => {
    setModalFeature(feature);
  };

  const handleCloseModal = () => {
    setModalFeature(null);
  };


  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <Head>
        <title>Product Prioritization Tool</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">
          Product Prioritization Tool
        </h1>
        <p className="text-slate-400 mt-2">Use the RICE framework to score and rank your ideas.</p>
      </header>

      <main>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {updatedFeatures.map(feature => (
            <FeatureCard
              key={feature.id}
              feature={feature}
              onChange={handleFeatureChange}
              isTopPriority={feature.id === topFeatureId}
              onGeneratePRD={handleGeneratePRD}
            />
          ))}
        </div>
      </main>
      
      <PRDModal feature={modalFeature} onClose={handleCloseModal} />

      <footer className="text-center mt-12 text-slate-500">
        <p>Built with Next.js, Tailwind CSS, and Lucide Icons.</p>
      </footer>
    </div>
  );
}
