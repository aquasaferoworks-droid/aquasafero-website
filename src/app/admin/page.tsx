'use client';

import { useState } from 'react';
import { useFirestore, useCollection } from '@/firebase';
import { collection, addDoc, deleteDoc, doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { VaelHeader } from '@/components/VaelHeader';
import { Loader2, Plus, Trash2, ExternalLink, LayoutGrid, Film, Smartphone, Maximize, List, Sparkles, AlertCircle } from 'lucide-react';
import { useMemoFirebase } from '@/firebase/firestore/use-collection';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const CATEGORIES = [
  { value: 'slider', label: 'Scroll Videos (Hero Slider)', icon: Film },
  { value: 'reel-horizontal', label: 'Small Box (Horizontal)', icon: LayoutGrid },
  { value: 'reel-medium', label: 'Small Box (Medium)', icon: LayoutGrid },
  { value: 'reel-vertical', label: 'Vertical Videos (9:16)', icon: Smartphone },
  { value: 'reel-feature', label: 'Big Videos (Wide Feature)', icon: Maximize },
  { value: 'film-gallery', label: 'Filmography List', icon: List },
];

export default function AdminPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [isSeeding, setIsSeeding] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    youtubeId: '',
    type: 'slider',
    role: 'Director',
    meta: '',
    award: '',
    order: 0
  });

  const videosQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return collection(firestore, 'videos');
  }, [firestore]);

  const { data: rawVideos, loading: videosLoading, error: videosError } = useCollection(videosQuery);

  const videos = (rawVideos || []).sort((a: any, b: any) => (a.order || 0) - (b.order || 0));

  const extractYoutubeId = (urlOrId: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = urlOrId.match(regExp);
    return (match && match[2].length === 11) ? match[2] : urlOrId;
  };

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firestore) return;
    
    setIsAdding(true);
    const cleanId = extractYoutubeId(formData.youtubeId);

    try {
      await addDoc(collection(firestore, 'videos'), {
        ...formData,
        youtubeId: cleanId,
        order: Number(formData.order) || 0,
        createdAt: serverTimestamp()
      });
      
      toast({ title: "Film Published", description: `${formData.title} is now live.` });
      
      setFormData({
        title: '',
        category: '',
        youtubeId: '',
        type: formData.type,
        role: 'Director',
        meta: '',
        award: '',
        order: (videos?.length || 0) + 1
      });
    } catch (error: any) {
      console.error('Error adding film:', error);
      toast({ 
        title: "Permission Denied", 
        description: "Please update your Firestore Rules to 'allow read, write: if true;'.", 
        variant: "destructive" 
      });
    } finally {
      setIsAdding(false);
    }
  };

  const seedShowcase = async () => {
    if (!firestore) return;
    setIsSeeding(true);
    
    try {
      const batch = writeBatch(firestore);
      const defaultProjects = [
        { title: 'HAWTHORN', youtubeId: 'NWPzwV3le50', type: 'slider', role: 'Director', category: 'Narrative', order: 1, meta: '2024 • ARRI ALEXA LF' },
        { title: 'VERMILION', youtubeId: 'lhdHDEhtMiI', type: 'slider', role: 'Director', category: 'Commercial', order: 2, meta: '2024 • 35MM FILM' },
        { title: 'NOCTURNE', youtubeId: 'nHSssoiMRE4', type: 'slider', role: 'Director', category: 'Documentary', order: 3, meta: '2023 • 16MM KODAK' },
        { title: 'VERTICAL ONE', youtubeId: 'NWPzwV3le50', type: 'reel-vertical', role: 'Director', category: 'Fashion', order: 4, meta: 'MUMBAI' },
        { title: 'VERTICAL TWO', youtubeId: 'lhdHDEhtMiI', type: 'reel-vertical', role: 'Director', category: 'Lifestyle', order: 5, meta: 'LONDON' },
        { title: 'VERTICAL THREE', youtubeId: 'nHSssoiMRE4', type: 'reel-vertical', role: 'Director', category: 'Art', order: 6, meta: 'NYC' },
      ];

      defaultProjects.forEach(proj => {
        const newDoc = doc(collection(firestore, 'videos'));
        batch.set(newDoc, { ...proj, createdAt: serverTimestamp() });
      });
      
      await batch.commit();
      toast({ title: "Showcase Seeded", description: "Flagship films added successfully." });
    } catch (error: any) {
      toast({ title: "Seed Failed", description: error.message, variant: "destructive" });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'videos', id));
      toast({ title: "Film Removed", description: "Entry deleted." });
    } catch (error: any) {
      toast({ title: "Removal Failed", description: "Check your permissions.", variant: "destructive" });
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <VaelHeader />
      
      <div className="flex pt-24 min-h-screen">
        <aside className="w-80 border-r border-white/5 bg-card/20 hidden lg:flex flex-col sticky top-24 h-[calc(100vh-6rem)] p-8 overflow-y-auto">
          <div className="mb-10">
            <h2 className="text-[10px] tracking-[0.5em] uppercase text-primary font-bold mb-4">Archive Management</h2>
            <p className="text-muted-foreground text-[11px] leading-relaxed uppercase tracking-wider">
              Publish new works directly to the cinematic archive.
            </p>
          </div>

          <form onSubmit={handleAddVideo} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-[9px] uppercase tracking-widest text-muted-foreground">Placement Type</Label>
                <Select value={formData.type} onValueChange={val => setFormData({...formData, type: val})}>
                  <SelectTrigger className="rounded-none bg-background border-white/10 h-11">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="rounded-none bg-black border-white/10">
                    {CATEGORIES.map(cat => (
                      <SelectItem key={cat.value} value={cat.value} className="text-[10px] uppercase tracking-widest">
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[9px] uppercase tracking-widest text-muted-foreground">Project Title</Label>
                <Input required placeholder="Title..." className="rounded-none bg-background border-white/10 h-11" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
              </div>

              <div className="space-y-2">
                <Label className="text-[9px] uppercase tracking-widest text-muted-foreground">YouTube URL or ID</Label>
                <Input required placeholder="Link..." className="rounded-none bg-background border-white/10 h-11" value={formData.youtubeId} onChange={e => setFormData({...formData, youtubeId: e.target.value})} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-[9px] uppercase tracking-widest text-muted-foreground">Category</Label>
                  <Input placeholder="Genre..." className="rounded-none bg-background border-white/10 h-11" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <Label className="text-[9px] uppercase tracking-widest text-muted-foreground">Order</Label>
                  <Input type="number" className="rounded-none bg-background border-white/10 h-11" value={formData.order} onChange={e => setFormData({...formData, order: Number(e.target.value)})} />
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isAdding} className="w-full rounded-none bg-primary text-primary-foreground py-6 h-auto text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-white hover:text-black transition-all">
              {isAdding ? <Loader2 className="animate-spin w-4 h-4" /> : <Plus className="mr-2 w-4 h-4" />}
              {isAdding ? 'Publishing...' : 'Publish Film'}
            </Button>
          </form>

          <div className="mt-auto pt-10">
            <Button onClick={seedShowcase} disabled={isSeeding} variant="outline" className="w-full rounded-none border-primary/20 text-primary/60 hover:text-primary hover:border-primary py-4 h-auto text-[9px] tracking-[0.2em] uppercase transition-all">
              {isSeeding ? <Loader2 className="animate-spin w-3 h-3 mr-2" /> : <Sparkles className="mr-2 w-3 h-3" />}
              Seed Initial Showcase
            </Button>
          </div>
        </aside>

        <div className="flex-1 p-8 md:p-16">
          <div className="max-w-6xl mx-auto space-y-12">
            {videosError && (
              <Alert variant="destructive" className="rounded-none bg-destructive/10 border-destructive/20">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle className="text-[10px] uppercase tracking-widest font-bold">Permissions Required</AlertTitle>
                <AlertDescription className="text-[11px] leading-relaxed opacity-80 uppercase tracking-tight">
                  Your Firestore Rules are blocking access. Please update your rules in the Firebase Console to 'allow read, write: if true;' to enable direct public management.
                </AlertDescription>
              </Alert>
            )}

            <header className="space-y-4">
              <h1 className="text-5xl md:text-7xl font-headline italic font-bold tracking-tighter uppercase">
                Active <span className="text-primary not-italic font-light">Archive</span>
              </h1>
              <div className="flex items-center gap-6">
                 <div className="w-12 h-px bg-primary/30" />
                 <span className="text-[10px] tracking-[0.4em] uppercase text-muted-foreground">
                   {videos?.length || 0} Films Currently Live
                 </span>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-4">
              {videosLoading && (
                <div className="py-24 flex flex-col items-center justify-center space-y-4 opacity-40">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  <p className="text-[10px] tracking-widest uppercase">Syncing Archive...</p>
                </div>
              )}
              
              {!videosLoading && videos?.map((video) => {
                const category = CATEGORIES.find(c => c.value === video.type);
                const CategoryIcon = category?.icon || Film;

                return (
                  <div key={video.id} className="bg-card/20 border border-white/5 p-4 flex items-center justify-between group hover:border-primary/20 transition-all">
                    <div className="flex items-center gap-6">
                      <div className="w-32 aspect-video bg-black relative overflow-hidden flex-shrink-0 border border-white/5">
                        <img src={`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`} alt="" className="object-cover w-full h-full opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-lg font-headline italic tracking-tight uppercase">{video.title}</h3>
                        <div className="flex items-center gap-3">
                          <CategoryIcon className="w-3 h-3 text-primary" />
                          <span className="text-[8px] uppercase tracking-[0.2em] text-primary font-bold">{category?.label.split('(')[0]}</span>
                          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">•</span>
                          <span className="text-[8px] uppercase tracking-[0.2em] text-muted-foreground">{video.category || 'NO TAG'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <a href={`https://youtube.com/watch?v=${video.youtubeId}`} target="_blank" rel="noopener noreferrer" className="p-3 hover:text-primary transition-colors">
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button onClick={() => handleDelete(video.id)} className="p-3 text-destructive hover:bg-destructive/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {!videosLoading && (!videos || videos.length === 0) && (
                <div className="py-32 text-center border border-dashed border-white/10">
                  <p className="italic font-headline text-lg opacity-20 uppercase tracking-widest">The archive is empty</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}