
'use client';

import { useState } from 'react';
import { useFirestore, useCollection } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VaelHeader } from '@/components/VaelHeader';
import { Loader2, Plus, Trash2, ExternalLink, LayoutGrid, Film, Smartphone, Maximize, Box, List, Sparkles, Tag, Layout } from 'lucide-react';
import { useMemoFirebase } from '@/firebase/firestore/use-collection';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PLACEMENT_TYPES = [
  { value: 'slider', label: 'Slider (Hero Carousel)', icon: Film },
  { value: 'reel-horizontal', label: 'Horizontal (Rows 1 & 2)', icon: LayoutGrid },
  { value: 'reel-feature', label: 'Large Feature (Row 3)', icon: Maximize },
  { value: 'reel-medium', label: 'Medium (Row 4)', icon: Box },
  { value: 'reel-vertical', label: 'Vertical (Row 5)', icon: Smartphone },
  { value: 'sidebar', label: 'Unlimited Sidebar Archive', icon: List },
];

const CATEGORIES = [
  'celebrity',
  'ads',
  'promo',
  'humor',
  'cricketers',
  'vfx',
  'home&living',
  'car',
  'food'
];

const MASTER_DATA = [
  { title: "Sleek Kitchens", upperText: "Sleek Kitchen", lowerText: "Asian Paint", youtubeId: "xTrPSfbWa0w", category: ["ads", "home&living"], type: "reel-horizontal", order: 1 },
  { title: "Cleartrip Insurance", upperText: "Insurance", lowerText: "Cleartrip", youtubeId: "4UATuJFYKfg", category: ["ads", "humor"], type: "reel-horizontal", order: 2 },
  { title: "Dabur Pudin Hara", upperText: "Pudin Hara", lowerText: "Dabur", youtubeId: "gJKxIAmhbvg", category: ["ads", "vfx"], type: "reel-horizontal", order: 3 },
  { title: "Mahindra Zeo EV", upperText: "Zeo EV", lowerText: "Mahindra", youtubeId: "QdEZtNyJb5g", category: ["ads", "car"], type: "reel-horizontal", order: 4 },
  { title: "ALIA BHATT | LAYS", upperText: "Lays Wafer Style", lowerText: "PepsiCo", youtubeId: "9A3yNxNyzDw", category: ["ads", "celebrity", "vfx"], type: "reel-feature", order: 5 },
  { title: "Tata Nexon EV", upperText: "Tata Nexon EV", lowerText: "Tata Motors", youtubeId: "Qwh1Si0Uozs", category: ["ads", "car"], type: "reel-medium", order: 6 },
  { title: "Godrej Interio", upperText: "Interio", lowerText: "Godrej", youtubeId: "6_FgbBV43q8", category: ["ads", "home&living"], type: "reel-medium", order: 7 },
  { title: "Snitch | Go Goa Gone", upperText: "Gone Goa Go", lowerText: "Snitch", youtubeId: "cb9-3Rgpn5E", category: ["ads", "humor"], type: "reel-vertical", order: 8 },
  { title: "Lays | Siddhant", upperText: "Lays Wafer Style", lowerText: "PepsiCo", youtubeId: "qiKh3ktuJ2Y", category: ["ads", "celebrity", "food"], type: "reel-vertical", order: 9 },
  { title: "Kankhajura | Roshan", upperText: "Kankhuraja", lowerText: "Sony Liv", youtubeId: "cu3xh14RYGU", category: ["promo", "celebrity"], type: "reel-vertical", order: 10 },
  { title: "Criminal Justice S4", upperText: "Criminal Justice S4", lowerText: "Jio Hotstar", youtubeId: "nHSssoiMRE4", category: ["promo", "celebrity"], type: "reel-vertical", order: 11 },
  { title: "Sun King | Rajkummar", upperText: "Set the Scene", lowerText: "Sun King", youtubeId: "eFhx307ykrk", category: ["ads", "celebrity"], type: "slider", order: 12 },
  { title: "Aspirants", upperText: "Aspirants", lowerText: "Prime Video", youtubeId: "BYhQMzGxHmg", category: ["promo", "celebrity"], type: "slider", order: 13 },
];

export default function AdminPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    upperText: '',
    lowerText: '',
    category: ['ads'] as string[],
    youtubeId: '',
    type: 'reel-horizontal',
    order: 0
  });

  const videosQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'videos');
  }, [firestore]);

  const { data: rawVideos, loading: videosLoading } = useCollection(videosQuery);

  const sortedVideos = (rawVideos || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  const handleCategoryToggle = (cat: string) => {
    setFormData(prev => {
      const current = prev.category;
      if (current.includes(cat)) {
        return { ...prev, category: current.filter(c => c !== cat) };
      } else {
        return { ...prev, category: [...current, cat] };
      }
    });
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;
    setIsAdding(true);
    try {
      await addDoc(collection(firestore, 'videos'), {
        ...formData,
        order: Number(formData.order) || 0,
        createdAt: serverTimestamp()
      });
      toast({ title: "Project Published" });
      setFormData({ ...formData, title: '', upperText: '', lowerText: '', youtubeId: '', order: sortedVideos.length + 1 });
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } finally {
      setIsAdding(false);
    }
  };

  const handlePopulateMaster = async () => {
    if (!firestore) return;
    setIsSeeding(true);
    const batch = writeBatch(firestore);
    try {
      MASTER_DATA.forEach((video) => {
        const newDoc = doc(collection(firestore, 'videos'));
        batch.set(newDoc, { ...video, createdAt: serverTimestamp() });
      });
      await batch.commit();
      toast({ title: "Master archive populated" });
    } catch (error: any) {
      toast({ title: "Sync Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'videos', id));
      toast({ title: "Film Removed" });
    } catch (error: any) {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <VaelHeader />
      <div className="flex pt-32 md:pt-40 min-h-screen">
        <aside className="w-96 border-r border-white/5 bg-black/40 hidden lg:flex flex-col sticky top-24 h-[calc(100vh-6rem)] p-8 overflow-y-auto no-scrollbar">
          <div className="mb-10 space-y-4">
            <h2 className="text-[10px] tracking-[0.5em] uppercase text-primary font-bold">Manager</h2>
            <Button onClick={handlePopulateMaster} disabled={isSeeding} variant="outline" className="w-full rounded-none border-primary/20 text-[9px] uppercase tracking-widest h-10">
              {isSeeding ? <Loader2 className="animate-spin w-3 h-3" /> : <Sparkles className="mr-2 w-3 h-3" />}
              Seed Master Data
            </Button>
          </div>

          <form onSubmit={handleAddVideo} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[9px] uppercase tracking-widest text-muted-foreground">Placement Type</Label>
                <Select value={formData.type} onValueChange={val => setFormData({...formData, type: val})}>
                  <SelectTrigger className="rounded-none bg-background border-white/10 h-11 text-[10px] uppercase">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none bg-black border-white/10">
                    {PLACEMENT_TYPES.map(pt => (
                      <SelectItem key={pt.value} value={pt.value} className="text-[10px] uppercase cursor-pointer">
                        {pt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-[9px] uppercase tracking-widest text-muted-foreground">Genres</Label>
                <div className="grid grid-cols-2 gap-2 border border-white/5 p-3 bg-black/40">
                  {CATEGORIES.map(cat => (
                    <div key={cat} className="flex items-center space-x-2">
                      <Checkbox id={`cat-${cat}`} checked={formData.category.includes(cat)} onCheckedChange={() => handleCategoryToggle(cat)} className="rounded-none border-white/20" />
                      <label htmlFor={`cat-${cat}`} className="text-[8px] uppercase tracking-widest cursor-pointer text-muted-foreground">{cat}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[9px] uppercase tracking-widest text-muted-foreground">Upper / Role</Label>
                <Input placeholder="Director / VFX" className="rounded-none bg-background border-white/10 h-11 text-xs" value={formData.upperText} onChange={e => setFormData({...formData, upperText: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] uppercase tracking-widest text-muted-foreground">Lower / Client</Label>
                <Input required placeholder="Nike / Netflix" className="rounded-none bg-background border-white/10 h-11 text-xs" value={formData.lowerText} onChange={e => setFormData({...formData, lowerText: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label className="text-[9px] uppercase tracking-widest text-muted-foreground">YouTube ID</Label>
                <Input required placeholder="v=..." className="rounded-none bg-background border-white/10 h-11 text-xs" value={formData.youtubeId} onChange={e => setFormData({...formData, youtubeId: e.target.value})} />
              </div>
            </div>

            <Button type="submit" disabled={isAdding} className="w-full rounded-none bg-primary text-primary-foreground py-6 h-auto text-[10px] tracking-[0.2em] uppercase font-bold">
              {isAdding ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="mr-2 w-4 h-4" />}
              Publish Project
            </Button>
          </form>
        </aside>

        <div className="flex-1 p-8 md:p-16 overflow-y-auto bg-black/20">
          <Tabs defaultValue="homepage" className="space-y-12">
            <div className="flex items-end justify-between border-b border-white/5 pb-8">
              <h1 className="text-4xl md:text-7xl font-headline italic uppercase tracking-tighter">
                Directorial <span className="text-primary not-italic font-light">Archive</span>
              </h1>
              <TabsList className="bg-white/5 rounded-none p-1 h-auto">
                <TabsTrigger value="homepage" className="rounded-none text-[10px] uppercase tracking-widest px-6 py-3">Homepage</TabsTrigger>
                <TabsTrigger value="sidebar" className="rounded-none text-[10px] uppercase tracking-widest px-6 py-3">Sidebar Archive</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="homepage" className="space-y-12">
              {PLACEMENT_TYPES.filter(p => p.value !== 'sidebar').map(section => {
                const videos = sortedVideos.filter(v => v.type === section.value);
                return (
                  <div key={section.value} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <section.icon className="w-4 h-4 text-primary" />
                      <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold">{section.label}</h2>
                      <Badge variant="outline" className="text-[8px] rounded-none border-white/10 uppercase">{videos.length}</Badge>
                    </div>
                    <div className="grid grid-cols-1 gap-4">
                      {videos.map(v => (
                        <div key={v.id} className="bg-white/5 border border-white/5 p-4 flex items-center justify-between rounded-none">
                          <div className="flex items-center gap-6">
                            <div className="w-24 aspect-video relative bg-black border border-white/5">
                              <img src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`} className="object-cover w-full h-full opacity-60" />
                            </div>
                            <div>
                              <p className="text-[8px] uppercase tracking-widest text-primary font-bold">{v.upperText}</p>
                              <h3 className="text-lg font-headline italic uppercase leading-none">{v.lowerText || v.title}</h3>
                            </div>
                          </div>
                          <button onClick={() => handleDelete(v.id)} className="text-destructive hover:bg-destructive/10 p-3"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </TabsContent>

            <TabsContent value="sidebar" className="space-y-6">
              <div className="flex items-center gap-4 mb-8">
                <List className="w-4 h-4 text-primary" />
                <h2 className="text-[11px] uppercase tracking-[0.3em] font-bold">Unlimited Sidebar Archive</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sortedVideos.filter(v => v.type === 'sidebar').map(v => (
                  <div key={v.id} className="bg-white/5 border border-white/5 p-4 flex items-center justify-between rounded-none">
                    <div className="flex items-center gap-6">
                      <div className="w-24 aspect-video relative bg-black">
                        <img src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`} className="object-cover w-full h-full opacity-60" />
                      </div>
                      <div>
                        <p className="text-[8px] uppercase tracking-widest text-primary font-bold">{v.upperText}</p>
                        <h3 className="text-base font-headline italic uppercase leading-none">{v.lowerText || v.title}</h3>
                      </div>
                    </div>
                    <button onClick={() => handleDelete(v.id)} className="text-destructive p-3"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
