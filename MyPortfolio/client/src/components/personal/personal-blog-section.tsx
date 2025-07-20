import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { BookOpen, Calendar, Tag, ArrowRight, Filter, Search, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

// Mock blog data - in a real app, this would come from your API
const blogPosts = [
  {
    id: 1,
    title: "Finding Joy in the Little Things",
    excerpt: "Sometimes the most profound moments come from the simplest experiences. Here's what I've learned about appreciating life's small wonders.",
    content: "Lorem ipsum dolor sit amet...",
    category: "Life",
    tags: ["mindfulness", "gratitude", "daily life"],
    image: null,
    published: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    title: "My Coffee Shop Adventures",
    excerpt: "Exploring the local coffee scene has become more than just a hobby - it's a journey of discovery and human connection.",
    content: "Lorem ipsum dolor sit amet...",
    category: "Adventures",
    tags: ["coffee", "exploration", "local"],
    image: null,
    published: true,
    createdAt: new Date("2024-01-10"),
  },
  {
    id: 3,
    title: "Lessons from Midnight Conversations",
    excerpt: "There's something magical about late-night talks with friends. Here are the profound insights that emerge when the world gets quiet.",
    content: "Lorem ipsum dolor sit amet...",
    category: "Reflections",
    tags: ["friendship", "deep thoughts", "growth"],
    image: null,
    published: true,
    createdAt: new Date("2024-01-05"),
  },
  {
    id: 4,
    title: "Why I Started Journaling (And You Should Too)",
    excerpt: "Writing down my thoughts has completely changed how I process emotions and experiences. Here's my journey with journaling.",
    content: "Lorem ipsum dolor sit amet...",
    category: "Personal Growth",
    tags: ["journaling", "self-reflection", "mental health"],
    image: null,
    published: true,
    createdAt: new Date("2023-12-28"),
  },
  {
    id: 5,
    title: "The Art of Slowing Down",
    excerpt: "In our fast-paced world, I've discovered the revolutionary act of simply slowing down and being present.",
    content: "Lorem ipsum dolor sit amet...",
    category: "Mindfulness",
    tags: ["mindfulness", "stress", "balance"],
    image: null,
    published: true,
    createdAt: new Date("2023-12-20"),
  },
  {
    id: 6,
    title: "Music That Shapes My Soul",
    excerpt: "Certain songs have the power to transport us, heal us, and help us grow. Here are the tracks that have shaped my journey.",
    content: "Lorem ipsum dolor sit amet...",
    category: "Music",
    tags: ["music", "emotions", "memories"],
    image: null,
    published: true,
    createdAt: new Date("2023-12-15"),
  },
];

const categories = ["All", "Life", "Adventures", "Reflections", "Personal Growth", "Mindfulness", "Music"];

export default function PersonalBlogSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section id="personal-blog" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="space-y-12"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <BookOpen className="w-8 h-8 text-violet-400" />
              <h2 className="text-4xl md:text-5xl font-bold text-gradient">My Blog</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Stories, thoughts, and reflections from my journey through life
            </p>
          </motion.div>

          {/* Search and Filter */}
          <motion.div variants={itemVariants} className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-violet-500/20 focus:border-violet-500/50"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-violet-500 text-white"
                      : "bg-slate-800/50 text-muted-foreground hover:bg-violet-500/20 hover:text-violet-400"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Filter className="w-3 h-3 inline mr-1" />
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          <motion.div 
            variants={itemVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-xl border border-violet-500/20 hover:border-violet-500/40 transition-all duration-300 overflow-hidden"
                whileHover={{ scale: 1.02, y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Image placeholder */}
                <div className="aspect-video bg-gradient-to-br from-violet-500/20 via-purple-500/20 to-pink-500/20 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl">📝</div>
                  </div>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-violet-500/30 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </div>

                <div className="p-6 space-y-4">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between text-sm">
                    <Badge variant="secondary" className="bg-violet-500/20 text-violet-400 border-violet-500/30">
                      {post.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-3 h-3" />
                      {post.createdAt.toLocaleDateString()}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground group-hover:text-violet-400 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-700/50 text-xs text-muted-foreground"
                      >
                        <Tag className="w-2 h-2" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More */}
                  <motion.button
                    className="flex items-center gap-2 text-violet-400 hover:text-violet-300 text-sm font-medium pt-2 group/btn"
                    whileHover={{ x: 5 }}
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Load More Button */}
          {filteredPosts.length > 6 && (
            <motion.div variants={itemVariants} className="text-center pt-8">
              <motion.button
                className="px-8 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Load More Stories
              </motion.button>
            </motion.div>
          )}

          {/* Writing Motivation */}
          <motion.div 
            variants={itemVariants}
            className="text-center py-12 bg-slate-800/20 rounded-2xl border border-violet-500/20"
          >
            <Heart className="w-12 h-12 text-violet-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-foreground mb-4">Why I Write</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Writing helps me process life's beautiful complexity. Each post is a snapshot of my journey, 
              a moment captured in words. I hope these stories resonate with you and maybe inspire you 
              to reflect on your own experiences.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}