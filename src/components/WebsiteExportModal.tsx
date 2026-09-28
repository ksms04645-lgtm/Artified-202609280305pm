import React, { useState } from 'react';
import { Download, Check, X, Package, Video, Instagram, Feather, FileJson, Code, Zap, Database, Copy, Layers } from 'lucide-react';
import { useCart } from '../context/CartContext';
import SAVED_PRODUCTS from '../data/products.json';
import SAVED_TIKTOK_REELS from '../data/tiktok_reels.json';
import SAVED_INSTAGRAM_ITEMS from '../data/instagram_journal.json';
import SAVED_CRAFT_STORY from '../data/craft_story.json';

interface WebsiteExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WebsiteExportModal: React.FC<WebsiteExportModalProps> = ({ isOpen, onClose }) => {
  const { products, reels, instagramItems, craftStory } = useCart() as any;
  const [copiedPart, setCopiedPart] = useState<string | null>(null);
  const [oneClickSuccess, setOneClickSuccess] = useState(false);
  const [masterSuccess, setMasterSuccess] = useState(false);

  if (!isOpen) return null;

  const currentProducts = products && products.length > 0 ? products : SAVED_PRODUCTS;
  const currentReels = reels && reels.length > 0 ? reels : SAVED_TIKTOK_REELS;
  const currentInstagram = instagramItems && instagramItems.length > 0 ? instagramItems : SAVED_INSTAGRAM_ITEMS;
  const currentCraftStory = craftStory || SAVED_CRAFT_STORY;

  const midPoint = Math.ceil(currentProducts.length / 2);
  const productsPart1 = currentProducts.slice(0, midPoint);
  const productsPart2 = currentProducts.slice(midPoint);

  const handleDownloadMasterBundle = () => {
    const masterBundle = {
      appVersion: "1.0.0",
      appName: "Artified NP - Handmade Craft Atelier",
      exportedAt: new Date().toISOString(),
      description: "Complete master bundle containing all products, TikTok reels, Instagram journal items, and Craft Story for AI Studio cross-build transfer.",
      productsCount: currentProducts.length,
      tiktokReelsCount: currentReels.length,
      instagramItemsCount: currentInstagram.length,
      products: currentProducts,
      reels: currentReels,
      instagramItems: currentInstagram,
      craftStory: currentCraftStory,
    };

    const blob = new Blob([JSON.stringify(masterBundle, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ArtifiedNP_Complete_Master_Export_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);

    setMasterSuccess(true);
    setTimeout(() => setMasterSuccess(false), 3000);
  };

  const handleDownloadIndividualFile = (filename: string, data: any) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleOneClickExportAll = () => {
    handleDownloadIndividualFile('products.json', currentProducts);
    setTimeout(() => handleDownloadIndividualFile('tiktok_reels.json', currentReels), 250);
    setTimeout(() => handleDownloadIndividualFile('instagram_journal.json', currentInstagram), 500);
    setTimeout(() => handleDownloadIndividualFile('craft_story.json', currentCraftStory), 750);

    setOneClickSuccess(true);
    setTimeout(() => setOneClickSuccess(false), 3000);
  };

  const handleCopyChunk = (partName: string, data: any) => {
    const textSnippet = `Here is ${partName} JSON data for Artified NP website:\n\`\`\`json\n${JSON.stringify(data, null, 2)}\n\`\`\``;
    navigator.clipboard.writeText(textSnippet);
    setCopiedPart(partName);
    setTimeout(() => setCopiedPart(null), 2500);
  };

  const handleCopyCodeInstructions = () => {
    const instructions = `
# GITHUB MIGRATION GUIDE
To export this website to your own GitHub repository with all ${currentProducts.length} products, TikTok videos, Instagram reels, and Craft Story intact, download the 4 JSON files above and place them in your repository's src/data/ folder.
    `.trim();
    navigator.clipboard.writeText(instructions);
    setCopiedPart('instructions');
    setTimeout(() => setCopiedPart(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FAF8F5] text-[#1C1B1A] border border-[#E8DFD8] rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#736C65] hover:text-[#1C1B1A] p-1.5 rounded-full hover:bg-[#E8DFD8]/50 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#1C1B1A] text-[#C5A880] flex items-center justify-center shadow-md">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-[#1C1B1A]">
              Complete Website & AI Studio Transfer
            </h3>
            <p className="text-xs text-[#736C65]">
              Copy exact products & videos in safe token-free chunks
            </p>
          </div>
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white p-3 rounded-2xl border border-[#E8DFD8] text-center">
            <Package className="w-4 h-4 text-[#C5A880] mx-auto mb-1" />
            <div className="text-lg font-serif font-bold text-[#1C1B1A]">{currentProducts.length}</div>
            <div className="text-[10px] text-[#736C65] uppercase tracking-wider">Products</div>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-[#E8DFD8] text-center">
            <Video className="w-4 h-4 text-[#C5A880] mx-auto mb-1" />
            <div className="text-lg font-serif font-bold text-[#1C1B1A]">{currentReels.length}</div>
            <div className="text-[10px] text-[#736C65] uppercase tracking-wider">TikTok Reels</div>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-[#E8DFD8] text-center">
            <Instagram className="w-4 h-4 text-[#C5A880] mx-auto mb-1" />
            <div className="text-lg font-serif font-bold text-[#1C1B1A]">{currentInstagram.length}</div>
            <div className="text-[10px] text-[#736C65] uppercase tracking-wider">Instagram</div>
          </div>
          <div className="bg-white p-3 rounded-2xl border border-[#E8DFD8] text-center">
            <Feather className="w-4 h-4 text-[#C5A880] mx-auto mb-1" />
            <div className="text-lg font-serif font-bold text-[#1C1B1A]">1</div>
            <div className="text-[10px] text-[#736C65] uppercase tracking-wider">Craft Story</div>
          </div>
        </div>

        {/* TOKEN-SAFE CHUNKED COPY BUTTONS FOR AI STUDIO */}
        <div className="space-y-3 bg-amber-50 p-4 rounded-2xl border border-amber-200">
          <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-amber-700" />
            <span>Copy Exact Data in Safe Token-Free Chunks</span>
          </h4>
          <p className="text-[11px] text-amber-800 leading-relaxed">
            To prevent token limit errors, copy these 3 parts sequentially into your new AI Studio build chat:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleCopyChunk('Products Part 1', productsPart1)}
              className="py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
            >
              {copiedPart === 'Products Part 1' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPart === 'Products Part 1' ? 'Copied Part 1!' : 'Copy Products P1'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopyChunk('Products Part 2', productsPart2)}
              className="py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
            >
              {copiedPart === 'Products Part 2' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPart === 'Products Part 2' ? 'Copied Part 2!' : 'Copy Products P2'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleCopyChunk('TikTok, Instagram & Craft Story', { reels: currentReels, instagramItems: currentInstagram, craftStory: currentCraftStory })}
              className="py-2 px-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1 shadow-sm"
            >
              {copiedPart === 'TikTok, Instagram & Craft Story' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedPart === 'TikTok, Instagram & Craft Story' ? 'Copied Media!' : 'Copy Media & Story'}</span>
            </button>
          </div>
        </div>

        {/* PRO TIP: ATTACH FILES TO AI STUDIO CHAT */}
        <div className="space-y-2 bg-white p-4 rounded-2xl border border-[#E8DFD8]">
          <h4 className="text-xs font-bold text-[#1C1B1A] uppercase tracking-wider mb-1">
            💡 Pro Tip for AI Studio Build:
          </h4>
          <p className="text-[11px] text-[#736C65] leading-relaxed">
            Click <strong className="text-[#1C1B1A]">"⚡ One-Click Export GitHub Data"</strong> below to download the JSON files, then simply drag and drop or attach <code className="bg-[#FAF8F5] px-1.5 py-0.5 rounded border border-[#E8DFD8]">products.json</code> directly into your new AI Studio chat. The AI will read all exact products and videos instantly without any token limits!
          </p>
        </div>

        {/* ONE CLICK GITHUB EXPORT BUTTON */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleOneClickExportAll}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white text-xs font-bold uppercase tracking-wider shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 text-amber-200 fill-amber-200" />
            <span>⚡ One-Click Export GitHub Data (All 4 JSON Files)</span>
          </button>
          {oneClickSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs text-center flex items-center justify-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Successfully downloaded products.json, tiktok_reels.json, instagram_journal.json, and craft_story.json!</span>
            </div>
          )}
        </div>

        {/* SINGULAR MASTER FILE DOWNLOAD */}
        <div className="space-y-2">
          <button
            type="button"
            onClick={handleDownloadMasterBundle}
            className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#1C1B1A] to-[#34312F] hover:from-[#34312F] hover:to-[#1C1B1A] text-[#FAF8F5] text-xs font-bold uppercase tracking-wider shadow-xl flex items-center justify-center gap-2.5 transition-all cursor-pointer border border-[#C5A880]/30"
          >
            <Database className="w-4 h-4 text-[#C5A880]" />
            <span>📦 Download Singular Master File (All-in-One JSON)</span>
          </button>
          {masterSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs text-center flex items-center justify-center gap-2 animate-fade-in">
              <Check className="w-4 h-4 text-emerald-600" />
              <span>Successfully downloaded singular master file!</span>
            </div>
          )}
        </div>

        <div className="text-center pt-1">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-[#736C65] hover:text-[#1C1B1A] font-medium underline cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
