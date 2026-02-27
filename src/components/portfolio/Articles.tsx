import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, ArrowUp, Search, Filter, ArrowDown, ArrowUp as ArrowUpIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import api from '@/lib/api';

const Articles = () => {
  const fallbackArticles: any[] = [];

  const [articles, setArticles] = useState<any[]>(fallbackArticles);
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'importance'>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get('/articles');
        if (res.data && res.data.length > 0) {
          // Map data to match fallback format
          const mapped = res.data.map((a: any) => ({
            ...a,
            url: a.link,
            image: a.image || 'https://balasubramaniyan-s.github.io/portfolio-assets/featsthree.jpg',
            importance: a.importance || 3
          }));
          setArticles(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };
    fetchArticles();
  }, []);

  // Get unique categories
  const categories = ['all', ...new Set(articles.map(article => article.category))];

  // Filter and sort articles
  const filteredArticles = articles
    .filter(article =>
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(article =>
      filterCategory === 'all' || article.category === filterCategory
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        return sortDirection === 'asc'
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return sortDirection === 'asc'
          ? a.importance - b.importance
          : b.importance - a.importance;
      }
    });

  const toggleSortDirection = () => {
    setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-4xl font-bold tracking-tight">Feats</h2>
        <p className="text-muted-foreground mt-2">My notable achievements and accomplishments</p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search achievements..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger className="w-[180px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: 'date' | 'importance') => setSortBy(value)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">Date</SelectItem>
              <SelectItem value="importance">Importance</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="icon"
            onClick={toggleSortDirection}
            aria-label={sortDirection === 'asc' ? 'Sort ascending' : 'Sort descending'}
          >
            {sortDirection === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No achievements found matching your criteria.</p>
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => {
              setSearchTerm('');
              setFilterCategory('all');
            }}
          >
            Clear filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article, idx) => (
            <Dialog key={idx} open={selectedArticle === article} onOpenChange={(open) => setSelectedArticle(open ? article : null)}>
              <DialogTrigger asChild>
                <Card
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 h-full cursor-pointer flex flex-col"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-background/90 px-2 py-1 rounded-full text-sm">
                      {article.readTime}
                    </div>
                  </div>

                  <CardHeader className="flex-grow">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="w-4 h-4" />
                      {new Date(article.date).toLocaleDateString('en-US', {
                        year: 'numeric'

                      })}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <Button variant="ghost" className="p-0 h-auto group">
                      Read More
                      <ArrowUp className="w-4 h-4 ml-2 rotate-45 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </DialogTrigger>

              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-2xl">{article.title}</DialogTitle>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    {new Date(article.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                    <span className="mx-1">•</span>
                    <span className="capitalize">{article.category}</span>
                    <span className="mx-1">•</span>
                    <span>Importance: {'★'.repeat(article.importance)}</span>
                  </div>
                </DialogHeader>

                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-64 object-cover rounded-lg my-4"
                />

                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <p>{article.excerpt}</p>

                  <div className="mt-6 flex gap-2">
                    <Button asChild>
                      <a href={article.url} target="_blank" rel="noopener noreferrer">
                        View Details
                      </a>
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedArticle(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;