import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Container, Typography, Box, Grid, Paper, Chip, Divider,
  Avatar, Button, IconButton, CircularProgress
} from '@mui/material';
import {
  ArrowBack, Bookmark, BookmarkBorder, Share, 
  ThumbUp, Comment, AccessTime
} from '@mui/icons-material';

const SingleBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    // In a real app, fetch the specific blog post using the ID
    // For now, we'll simulate loading and use mock data
    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const mockBlog = {
        id: parseInt(id),
        title: "Understanding SystemVerilog Interfaces for Effective Verification",
        author: "Sarah Johnson",
        date: "October 15, 2023",
        readTime: "8 min read",
        image: "https://picsum.photos/800/400",
        category: "Verification",
        tags: ["SystemVerilog", "Interfaces", "UVM", "Verification"],
        content: `
          <p>SystemVerilog interfaces are a powerful feature that help organize and simplify the connection between design blocks and verification components. This article explores how to use interfaces effectively to improve your verification environment.</p>

          <h2>What are SystemVerilog Interfaces?</h2>
          <p>An interface in SystemVerilog is a bundle of signals and possibly tasks and functions that can be referenced as a single unit. Interfaces allow you to group related signals together, making it easier to connect modules and verification components.</p>

          <p>Here's a simple example of an interface declaration:</p>
          <pre><code>
// Simple bus interface example
interface simple_bus;
  logic clk;
  logic reset;
  logic [7:0] data;
  logic valid;
  logic ready;
  
  modport master (
    output clk, reset, data, valid,
    input ready
  );
  
  modport slave (
    input clk, reset, data, valid,
    output ready
  );
endinterface
          </code></pre>

          <h2>Benefits of Using Interfaces</h2>
          <ul>
            <li><strong>Simplified Module Connections</strong>: Pass a single interface instance instead of individual signals</li>
            <li><strong>Abstraction</strong>: Hide implementation details behind a well-defined interface</li>
            <li><strong>Reusability</strong>: Reuse the same interface definition across different modules</li>
            <li><strong>Maintainability</strong>: Change interface details in one place</li>
          </ul>

          <h2>Interfaces in UVM</h2>
          <p>The Universal Verification Methodology (UVM) makes extensive use of interfaces. Typically, you'll create a virtual interface handle in your UVM components to access the DUT signals.</p>

          <p>Here's how you might use a virtual interface in a UVM driver:</p>
          <pre><code>
// Example UVM driver with virtual interface
class my_driver extends uvm_driver #(my_transaction);
  virtual simple_bus vif;
  
  function void build_phase(uvm_phase phase);
    super.build_phase(phase);
    if(!uvm_config_db#(virtual simple_bus)::get(this, "", "vif", vif))
      \`uvm_fatal("NO_VIF", "Virtual interface not set")
  endfunction
  
  task run_phase(uvm_phase phase);
    forever begin
      seq_item_port.get_next_item(req);
      // Drive signals through the virtual interface
      vif.data = req.data;
      vif.valid = 1;
      @(posedge vif.clk);
      while (!vif.ready) @(posedge vif.clk);
      vif.valid = 0;
      seq_item_port.item_done();
    end
  endtask
endclass
          </code></pre>

          <h2>Best Practices</h2>
          <p>When working with interfaces, consider these best practices:</p>
          <ol>
            <li>Define modports to clarify signal directions</li>
            <li>Include tasks and functions in interfaces for common operations</li>
            <li>Use clocking blocks for synchronous logic</li>
            <li>Create interface classes for more complex abstractions</li>
          </ol>

          <h2>Conclusion</h2>
          <p>SystemVerilog interfaces are a valuable tool for organizing your design and verification code. By grouping related signals together and providing a clean abstraction boundary, interfaces help make your code more maintainable and reusable.</p>

          <p>In your next project, consider using interfaces from the start to help structure your design and verification components in a more modular way.</p>
        `,
        likes: 124,
        comments: 28
      };

      setBlog(mockBlog);
      
      // Set some related blogs
      setRelatedBlogs([
        {
          id: 2,
          title: "Advanced UVM Techniques for SoC Verification",
          image: "https://picsum.photos/400/250?random=1",
          date: "September 5, 2023",
          category: "Verification"
        },
        {
          id: 3,
          title: "Getting Started with FPGA Development",
          image: "https://picsum.photos/400/250?random=2",
          date: "August 12, 2023",
          category: "FPGA"
        },
        {
          id: 4,
          title: "Synthesis Best Practices for Better Timing Closure",
          image: "https://picsum.photos/400/250?random=3",
          date: "July 28, 2023",
          category: "Synthesis"
        }
      ]);
      
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: `Check out this blog: ${blog.title}`,
        url: window.location.href
      }).catch(err => {
        console.error('Error sharing:', err);
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href)
        .then(() => {
          alert('Link copied to clipboard!');
        })
        .catch(err => {
          console.error('Failed to copy link:', err);
        });
    }
  };

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minHeight: '70vh'
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Button 
        component={Link} 
        to="/blog" 
        startIcon={<ArrowBack />}
        sx={{ mb: 4 }}
      >
        Back to Blogs
      </Button>

      {blog && (
        <>
          <Paper elevation={2} sx={{ p: 0, overflow: 'hidden', mb: 6, borderRadius: 2 }}>
            <Box 
              component="img"
              src={blog.image}
              alt={blog.title}
              sx={{ 
                width: '100%',
                height: { xs: 200, sm: 300, md: 400 },
                objectFit: 'cover'
              }}
            />
            
            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  mb: 2
                }}
              >
                <Chip 
                  label={blog.category} 
                  color="primary" 
                  size="small" 
                  sx={{ fontWeight: 500, mb: { xs: 1, sm: 0 } }}
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={toggleBookmark}>
                    {isBookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
                  </IconButton>
                  <IconButton onClick={handleShare}>
                    <Share />
                  </IconButton>
                </Box>
              </Box>
              
              <Typography 
                variant="h3" 
                component="h1"
                sx={{ 
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', sm: '2.5rem', md: '3rem' },
                  mb: 3
                }}
              >
                {blog.title}
              </Typography>
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  mb: 4
                }}
              >
                <Avatar alt={blog.author} src="/static/images/avatar/1.jpg" sx={{ mr: 2 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {blog.author}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                    <Typography variant="body2" sx={{ mr: 2 }}>
                      {blog.date}
                    </Typography>
                    <AccessTime fontSize="small" sx={{ fontSize: '0.8rem', mr: 0.5 }} />
                    <Typography variant="body2">
                      {blog.readTime}
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box 
                sx={{ mb: 4 }}
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {blog.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    variant="outlined"
                    size="small"
                    sx={{ borderRadius: 1 }}
                  />
                ))}
              </Box>
              
              <Divider sx={{ my: 4 }} />
              
              <Box 
                sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button startIcon={<ThumbUp />} sx={{ mr: 2 }}>
                    {blog.likes} Likes
                  </Button>
                  <Button startIcon={<Comment />}>
                    {blog.comments} Comments
                  </Button>
                </Box>
                
                <Box>
                  <IconButton onClick={handleShare}>
                    <Share />
                  </IconButton>
                  <IconButton onClick={toggleBookmark}>
                    {isBookmarked ? <Bookmark color="primary" /> : <BookmarkBorder />}
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Related blogs section */}
          <Box sx={{ mt: 8, mb: 4 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 4, fontWeight: 700 }}>
              Related Articles
            </Typography>
            <Grid container spacing={3}>
              {relatedBlogs.map((relatedBlog) => (
                <Grid item xs={12} sm={6} md={4} key={relatedBlog.id}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      overflow: 'hidden',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: 6
                      },
                      borderRadius: 2
                    }}
                  >
                    <Box 
                      component={Link}
                      to={`/blog/${relatedBlog.id}`}
                      sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1, display: 'flex', flexDirection: 'column' }}
                    >
                      <Box 
                        component="img"
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        sx={{ 
                          width: '100%',
                          height: 200,
                          objectFit: 'cover'
                        }}
                      />
                      <Box sx={{ p: 3, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Chip 
                          label={relatedBlog.category} 
                          size="small" 
                          sx={{ alignSelf: 'flex-start', mb: 2 }}
                        />
                        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                          {relatedBlog.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 'auto' }}>
                          {relatedBlog.date}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </>
      )}
    </Container>
  );
};

export default SingleBlog; 