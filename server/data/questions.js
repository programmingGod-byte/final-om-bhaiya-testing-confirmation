const questions = [
  {
    title: "What's the most efficient way to implement a 4-bit multiplier in Verilog?",
    content: "I'm working on a project that requires a 4-bit multiplier. I've tried a naive implementation using a nested loop, but I'm wondering if there are more efficient techniques specifically for FPGA implementation. I'm particularly interested in a shift-and-add approach, but I'm not sure how to optimize it properly.",
    tags: ["verilog", "multiplier", "optimization", "fpga"],
    codeSnippet: `module multiplier_4bit(
  input [3:0] a,
  input [3:0] b,
  output [7:0] product
);
  // My current implementation
  // ...
endmodule`,
    difficulty: 3,
  },
  {
    title: "Understanding non-blocking assignments in Verilog",
    content: "I'm confused about when to use blocking (=) versus non-blocking (<=) assignments in Verilog. Could someone explain the difference and provide guidelines on which to use in different situations? I've read that non-blocking should be used in sequential blocks and blocking in combinational, but I'm still not clear on the 'why'.",
    tags: ["verilog", "sequential-logic", "best-practices"],
    codeSnippet: `always @(posedge clk) begin
  a <= b; // Non-blocking
  c = d;  // Blocking - is this correct here?
end`,
    difficulty: 2,
  },
  {
    title: "Guidelines for writing synthesizable Verilog code",
    content: "I'm familiar with Verilog for simulation but need advice on writing code that synthesizes efficiently. What are the key guidelines to ensure my code is synthesizable and produces optimal hardware? In particular, I'm wondering about constructs to avoid (like initial blocks in RTL), best practices for modeling combinational vs. sequential logic, and common pitfalls that lead to simulation/synthesis mismatches.",
    tags: ["verilog", "synthesis", "rtl", "best-practices", "fpga"],
    difficulty: 4,
  },
  {
    title: "RISC-V implementation in Verilog - Starting Point",
    content: "I'm interested in implementing a simple RISC-V processor in Verilog for learning purposes. What would be a good starting point? Are there any open-source implementations that are well documented and suitable for beginners? I have experience with Verilog but I've never implemented a full processor before.",
    tags: ["verilog", "risc-v", "processor-design"],
    difficulty: 5,
  },
  {
    title: "Debugging timing issues in synchronous design",
    content: "I'm facing timing violations in my synchronous Verilog design that only appear after synthesis. My setup and hold times are being violated for some paths, but I'm not sure how to debug this systematically. What are the best strategies for tracking down and fixing timing issues?",
    tags: ["verilog", "timing", "synthesis", "debugging"],
    codeSnippet: `// Simplified version of my problematic module
module timing_issue (
  input clk,
  input [31:0] data_in,
  output reg [31:0] data_out
);
  reg [31:0] intermediate;
  
  always @(posedge clk) begin
    intermediate <= data_in + 32'h1234;
    data_out <= intermediate ^ 32'habcd;
  end
endmodule`,
    difficulty: 4,
  }
];

module.exports = questions; 