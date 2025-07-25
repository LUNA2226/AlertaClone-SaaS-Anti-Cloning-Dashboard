import React, { useState } from 'react';
import { XIcon, ShieldIcon, ImageIcon, RefreshCwIcon, LinkIcon, EyeIcon } from 'lucide-react';
export function ProtectionModal({
  domain,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('protection');
  const [settings, setSettings] = useState({
    autoRedirect: true,
    visualSabotage: false,
    redirectLinks: true,
    replaceImages: false,
    fixCheckoutLinks: false
  });
  const [imageUrl, setImageUrl] = useState('');
  const [checkoutSettings, setCheckoutSettings] = useState({
    enabled: false,
    checkoutUrl: '',
    totalVisits: 10,
    redirectCount: 3
  });
  const [randomPageUrl, setRandomPageUrl] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const toggleSetting = setting => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };
  const tabs = [{
    id: 'protection',
    label: 'Protection',
    icon: <ShieldIcon size={18} />
  }, {
    id: 'images',
    label: 'Images',
    icon: <ImageIcon size={18} />
  }, {
    id: 'checkout',
    label: 'Checkout',
    icon: <RefreshCwIcon size={18} />
  }];
  return <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <ShieldIcon className="text-cyan-400 mr-2" size={24} />
            <div>
              <h2 className="text-xl font-semibold">Configure Protection</h2>
              <p className="text-sm text-gray-400">{domain.domain}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-gray-700 hover:bg-gray-600 rounded-full text-gray-400 hover:text-white transition-colors">
            <XIcon size={20} />
          </button>
        </div>
        <div className="border-b border-gray-700 mb-6">
          <div className="flex space-x-4">
            {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-4 py-2 -mb-px ${activeTab === tab.id ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-gray-300'}`}>
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>)}
          </div>
        </div>
        {activeTab === 'protection' && <div className="space-y-4">
            {[{
          id: 'autoRedirect',
          title: 'Automatic Redirect',
          description: 'Redirect visitors to the original site',
          icon: <RefreshCwIcon size={20} />
        }, {
          id: 'visualSabotage',
          title: 'Visual Sabotage',
          description: 'Enable visual sabotage effects on the cloned page',
          icon: <ImageIcon size={20} />
        }, {
          id: 'replaceImages',
          title: 'Replace Images',
          description: 'Replace all images with a custom image',
          icon: <ImageIcon size={20} />
        }, {
          id: 'fixCheckoutLinks',
          title: 'Fix Checkout Links',
          description: 'Change checkout links to the correct ones',
          icon: <LinkIcon size={20} />
        }, {
          id: 'redirectLinks',
          title: 'Link Redirection',
          description: 'Redirect all links to the original site',
          icon: <RefreshCwIcon size={20} />
        }].map(setting => <div key={setting.id} className="flex items-start justify-between p-4 bg-gray-750 rounded-lg">
                <div className="flex items-start">
                  <div className={`p-2 rounded-lg mr-3 ${settings[setting.id] ? 'bg-cyan-500/20 text-cyan-400' : 'bg-gray-700 text-gray-300'}`}>
                    {setting.icon}
                  </div>
                  <div>
                    <h3 className="font-medium">{setting.title}</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      {setting.description}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input type="checkbox" checked={settings[setting.id]} onChange={() => toggleSetting(setting.id)} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>)}
          </div>}
        {activeTab === 'images' && <div className="space-y-6">
            <div className="bg-gray-750 rounded-lg p-4">
              <h3 className="text-lg font-medium mb-4">Image Replacement</h3>
              <p className="text-sm text-gray-400 mb-4">
                Provide the URL of the image that will replace all images on the
                cloned site. We recommend using an image that clearly identifies
                the site as a clone.
              </p>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input type="url" value={imageUrl} onChange={e => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" />
                </div>
                {imageUrl && <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">
                      Preview:
                    </label>
                    <div className="bg-gray-700 rounded-lg p-8 flex items-center justify-center">
                      <div className="relative w-48 h-48 bg-gray-600 rounded-lg overflow-hidden">
                        {isImageLoading && <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-pulse text-gray-400">
                              Loading...
                            </div>
                          </div>}
                        <img src={imageUrl} alt="Preview" className="w-full h-full object-contain" onError={e => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+Image';
                  }} onLoad={() => setIsImageLoading(false)} onLoadStart={() => setIsImageLoading(true)} />
                      </div>
                    </div>
                  </div>}
              </div>
            </div>
          </div>}
        {activeTab === 'checkout' && <div className="space-y-6">
            <div className="bg-gray-750 rounded-lg p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Original Checkout Link
                  </label>
                  <input type="url" value={checkoutSettings.checkoutUrl} onChange={e => setCheckoutSettings(prev => ({
                ...prev,
                checkoutUrl: e.target.value
              }))} placeholder="https://checkout.yoursite.com" className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" />
                  <p className="mt-1 text-xs text-gray-400">
                    This is the link where traffic will be redirected
                  </p>
                </div>
                <div className="pt-4 border-t border-gray-700"></div>
              </div>
            </div>
          </div>}
        {activeTab === 'random' && <div className="space-y-6">
            <div className="bg-gray-750 rounded-lg p-4">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Random Page Link
                  </label>
                  <input type="url" value={randomPageUrl} onChange={e => setRandomPageUrl(e.target.value)} placeholder="https://example.com/random-page" className="w-full px-3 py-2 bg-gray-700 rounded-lg border border-gray-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500" />
                  <p className="mt-1 text-xs text-gray-400">
                    Spies will be redirected to this page when spy prevention is
                    active
                  </p>
                </div>
              </div>
            </div>
          </div>}
        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-300 hover:text-white">
            Cancel
          </button>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500" onClick={() => {
          // Handle save
          onClose();
        }}>
            Save Settings
          </button>
        </div>
      </div>
    </div>;
}