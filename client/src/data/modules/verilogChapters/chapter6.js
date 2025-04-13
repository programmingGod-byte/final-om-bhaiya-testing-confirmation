const chapter6 = {
  id: 6,
  title: "Hierarchical Design and Module Instantiation",
  description: "Learn to create complex designs through modular design principles and hierarchical composition",
  estimatedTime: "3 hours",
  completed: false,
  sections: [
    {
      id: "6.1",
      title: "Hierarchical Design Principles",
      content: `
        <h3>Why Design Hierarchically?</h3>
        <p>Hierarchical design is a fundamental approach to managing complexity in digital systems. By breaking down a complex system into smaller, more manageable modules, designers can create sophisticated hardware that would otherwise be unmanageable.</p>
        
        <h4>Benefits of Hierarchical Design</h4>
        <ul>
          <li><strong>Reduced Complexity</strong>: Complex systems become easier to understand when broken down into smaller, focused modules.</li>
          <li><strong>Reusability</strong>: Well-designed modules can be reused across multiple projects or multiple times within the same project.</li>
          <li><strong>Team Collaboration</strong>: Different team members can work on different modules simultaneously.</li>
          <li><strong>Easier Testing</strong>: Individual modules can be verified independently before integration.</li>
          <li><strong>Maintainability</strong>: Changes to one module don't necessitate changes to the entire design.</li>
          <li><strong>Scalability</strong>: A hierarchical approach makes it easier to extend functionality over time.</li>
        </ul>
        
        <h4>Design Hierarchy Example</h4>
        <p>Consider a simple CPU design with the following hierarchical structure:</p>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://www.researchgate.net/publication/334397596/figure/fig1/AS:780440294703105@1563364629135/CPU-Design-Hierarchy.png" alt="CPU Design Hierarchy" style="max-width: 700px; width: 100%;">
        </div>
        
        <p>In this hierarchy:</p>
        <ul>
          <li>Each block represents a Verilog module</li>
          <li>Higher-level modules instantiate lower-level modules</li>
          <li>Each module has a specific, well-defined function</li>
          <li>Signal flow between modules is clearly defined through module interfaces</li>
        </ul>
        
        <h4>Planning a Hierarchical Design</h4>
        <p>When planning a hierarchical design, consider the following steps:</p>
        
        <ol>
          <li><strong>System Architecture</strong>: Define the overall structure and main functional blocks</li>
          <li><strong>Module Boundaries</strong>: Determine where to divide functionality between modules</li>
          <li><strong>Interface Definition</strong>: Define how modules will communicate (ports, protocols)</li>
          <li><strong>Module Granularity</strong>: Balance between too many small modules and too few large ones</li>
          <li><strong>Reuse Opportunities</strong>: Identify modules that can be reused multiple times</li>
        </ol>
      `
    },
    {
      id: "6.2",
      title: "Module Port Declarations",
      content: `
        <h3>Defining Module Interfaces</h3>
        <p>A module's interface consists of its ports, which define how it communicates with other modules. Well-designed ports make modules easier to instantiate, understand, and reuse.</p>
        
        <h4>Port Declaration Styles</h4>
        <p>Verilog offers two styles for port declarations:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // ANSI C-style (Verilog-2001, recommended)<br>
          module counter #(<br>
          &nbsp;&nbsp;parameter WIDTH = 8<br>
          )(<br>
          &nbsp;&nbsp;input wire clk,<br>
          &nbsp;&nbsp;input wire rst_n,<br>
          &nbsp;&nbsp;input wire enable,<br>
          &nbsp;&nbsp;output reg [WIDTH-1:0] count<br>
          );<br>
          &nbsp;&nbsp;// Module body...<br>
          endmodule<br>
          <br>
          // Non-ANSI style (Verilog-1995)<br>
          module counter(clk, rst_n, enable, count);<br>
          &nbsp;&nbsp;parameter WIDTH = 8;<br>
          &nbsp;&nbsp;<br>
          &nbsp;&nbsp;input clk;<br>
          &nbsp;&nbsp;input rst_n;<br>
          &nbsp;&nbsp;input enable;<br>
          &nbsp;&nbsp;output [WIDTH-1:0] count;<br>
          &nbsp;&nbsp;<br>
          &nbsp;&nbsp;reg [WIDTH-1:0] count;<br>
          &nbsp;&nbsp;// Module body...<br>
          endmodule
        </div>
        
        <p>The ANSI C-style (Verilog-2001) is more concise and is the preferred approach for modern designs.</p>
        
        <h4>Port Types and Directions</h4>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Port Direction</th>
            <th>Description</th>
            <th>Valid Data Types</th>
          </tr>
          <tr>
            <td><code>input</code></td>
            <td>Data flows into the module</td>
            <td><code>wire</code>, <code>reg</code> (as an input type only)</td>
          </tr>
          <tr>
            <td><code>output</code></td>
            <td>Data flows out of the module</td>
            <td><code>wire</code>, <code>reg</code></td>
          </tr>
          <tr>
            <td><code>inout</code></td>
            <td>Bidirectional data flow</td>
            <td><code>wire</code></td>
          </tr>
        </table>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Port Type Guidance</h4>
          <ul>
            <li>Always use <code>input wire</code> for input ports (the <code>wire</code> is optional but improves clarity)</li>
            <li>Use <code>output wire</code> for outputs that are driven by continuous assignments (<code>assign</code>)</li>
            <li>Use <code>output reg</code> for outputs that are assigned within procedural blocks (<code>always</code>)</li>
            <li>Use <code>inout wire</code> for bidirectional ports (like tristate buses)</li>
          </ul>
        </div>
        
        <h4>Interface Best Practices</h4>
        <ol>
          <li><strong>Group Related Signals</strong>: Organize ports logically, keeping related signals together</li>
          <li><strong>Consistent Naming</strong>: Use consistent naming conventions for similar ports across modules</li>
          <li><strong>Include Clock & Reset</strong>: For sequential modules, include clock and reset as the first ports</li>
          <li><strong>Descriptive Names</strong>: Use clear, descriptive port names that indicate function</li>
          <li><strong>Parameterization</strong>: Use parameters for configurable aspects like bit widths</li>
          <li><strong>Comments</strong>: Add comments to explain non-obvious ports</li>
        </ol>
        
        <h4>Example: Well-Designed Module Interface</h4>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module fifo #(<br>
          &nbsp;&nbsp;parameter DATA_WIDTH = 8,<br>
          &nbsp;&nbsp;parameter DEPTH = 16,<br>
          &nbsp;&nbsp;parameter ALMOST_FULL_THRESHOLD = DEPTH-2,<br>
          &nbsp;&nbsp;parameter ALMOST_EMPTY_THRESHOLD = 2<br>
          )(<br>
          &nbsp;&nbsp;// Clock and reset<br>
          &nbsp;&nbsp;input wire clk,<br>
          &nbsp;&nbsp;input wire rst_n,<br>
          <br>
          &nbsp;&nbsp;// Write interface<br>
          &nbsp;&nbsp;input wire wr_en,<br>
          &nbsp;&nbsp;input wire [DATA_WIDTH-1:0] wr_data,<br>
          &nbsp;&nbsp;output wire full,<br>
          &nbsp;&nbsp;output wire almost_full,<br>
          <br>
          &nbsp;&nbsp;// Read interface<br>
          &nbsp;&nbsp;input wire rd_en,<br>
          &nbsp;&nbsp;output wire [DATA_WIDTH-1:0] rd_data,<br>
          &nbsp;&nbsp;output wire empty,<br>
          &nbsp;&nbsp;output wire almost_empty,<br>
          <br>
          &nbsp;&nbsp;// Status<br>
          &nbsp;&nbsp;output wire [$clog2(DEPTH):0] fill_level<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Module implementation...<br>
          <br>
          endmodule
        </div>
        
        <p>This interface design has several strengths:</p>
        <ul>
          <li>Parameterized for flexibility</li>
          <li>Logically organized groups of signals</li>
          <li>Clear, descriptive port names</li>
          <li>Appropriate port types (wire/reg)</li>
          <li>Includes comments to explain the purpose of each group</li>
        </ul>
      `
    },
    {
      id: "6.3",
      title: "Module Instantiation",
      content: `
        <h3>Using Modules in Your Design</h3>
        <p>Module instantiation is how you create instances of modules and connect them together to form a hierarchical design.</p>
        
        <h4>Basic Instantiation Syntax</h4>
        <p>The basic syntax for instantiating a module is:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module_name instance_name (<br>
          &nbsp;&nbsp;// Port connections<br>
          );
        </div>
        
        <h4>Port Connection Methods</h4>
        <p>There are three methods for connecting ports when instantiating a module:</p>
        
        <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
          <tr style="background-color:#f0f0f0">
            <th>Connection Method</th>
            <th>Syntax</th>
            <th>Description</th>
          </tr>
          <tr>
            <td>Positional</td>
            <td><code>module_name instance_name(signal1, signal2, ...);</code></td>
            <td>Connections made based on port order in module definition</td>
          </tr>
          <tr>
            <td>Named (explicit)</td>
            <td><code>module_name instance_name(.port1(signal1), .port2(signal2), ...);</code></td>
            <td>Connections explicitly named, order doesn't matter</td>
          </tr>
          <tr>
            <td>Named (implicit)</td>
            <td><code>module_name instance_name(.port1, .port2, ...);</code></td>
            <td>Verilog-2001 feature where port and signal have the same name</td>
          </tr>
        </table>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Best Practice</h4>
          <p>Always use named port connections (.port_name(signal_name)) for clarity and maintainability. Positional connections are prone to errors when port lists change.</p>
        </div>
        
        <h4>Examples of Module Instantiation</h4>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Module definition<br>
          module counter #(<br>
          &nbsp;&nbsp;parameter WIDTH = 8<br>
          )(<br>
          &nbsp;&nbsp;input wire clk,<br>
          &nbsp;&nbsp;input wire rst_n,<br>
          &nbsp;&nbsp;input wire enable,<br>
          &nbsp;&nbsp;output reg [WIDTH-1:0] count<br>
          );<br>
          &nbsp;&nbsp;// Module implementation...<br>
          endmodule<br>
          <br>
          // Using the counter module in another module<br>
          module top_module(<br>
          &nbsp;&nbsp;input wire system_clk,<br>
          &nbsp;&nbsp;input wire system_rst_n,<br>
          &nbsp;&nbsp;input wire [1:0] mode,<br>
          &nbsp;&nbsp;output wire [15:0] count_value<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Internal signals<br>
          &nbsp;&nbsp;wire counter_enable;<br>
          <br>
          &nbsp;&nbsp;// Generate enable signal based on mode<br>
          &nbsp;&nbsp;assign counter_enable = (mode != 2'b00);<br>
          <br>
          &nbsp;&nbsp;// Instantiate counter with positional connections (NOT recommended)<br>
          &nbsp;&nbsp;counter #(16) counter_inst1(system_clk, system_rst_n, counter_enable, count_value);<br>
          <br>
          &nbsp;&nbsp;// Better: Instantiate with named connections (recommended)<br>
          &nbsp;&nbsp;counter #(<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.WIDTH(16)<br>
          &nbsp;&nbsp;) counter_inst2 (<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.clk(system_clk),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.rst_n(system_rst_n),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.enable(counter_enable),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.count(count_value)<br>
          &nbsp;&nbsp;);<br>
          <br>
          endmodule
        </div>
        
        <h4>Parameter Overriding</h4>
        <p>Parameters allow modules to be configurable. There are several ways to override parameters:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Method 1: Parameter value override (older style)<br>
          counter #(16) counter_inst1(...); // Sets WIDTH to 16<br>
          <br>
          // Method 2: Named parameter override (preferred)<br>
          counter #(<br>
          &nbsp;&nbsp;.WIDTH(16)<br>
          ) counter_inst2 (...);<br>
          <br>
          // Method 3: Multiple parameters<br>
          memory #(<br>
          &nbsp;&nbsp;.DATA_WIDTH(32),<br>
          &nbsp;&nbsp;.ADDR_WIDTH(10),<br>
          &nbsp;&nbsp;.DEPTH(1024)<br>
          ) memory_inst (...);<br>
          <br>
          // Using default parameters (no override)<br>
          counter counter_inst3(...); // Uses default WIDTH=8
        </div>
        
        <h4>Multiple Instantiations</h4>
        <p>You can create multiple instances of the same module, each with its own configuration:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module multi_counter(<br>
          &nbsp;&nbsp;input wire clk,<br>
          &nbsp;&nbsp;input wire rst_n,<br>
          &nbsp;&nbsp;output wire [7:0] count_8bit,<br>
          &nbsp;&nbsp;output wire [15:0] count_16bit,<br>
          &nbsp;&nbsp;output wire [31:0] count_32bit<br>
          );<br>
          <br>
          &nbsp;&nbsp;// 8-bit counter instance<br>
          &nbsp;&nbsp;counter #(<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.WIDTH(8)<br>
          &nbsp;&nbsp;) counter_8 (<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.clk(clk),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.rst_n(rst_n),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.enable(1'b1),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.count(count_8bit)<br>
          &nbsp;&nbsp;);<br>
          <br>
          &nbsp;&nbsp;// 16-bit counter instance<br>
          &nbsp;&nbsp;counter #(<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.WIDTH(16)<br>
          &nbsp;&nbsp;) counter_16 (<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.clk(clk),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.rst_n(rst_n),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.enable(1'b1),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.count(count_16bit)<br>
          &nbsp;&nbsp;);<br>
          <br>
          &nbsp;&nbsp;// 32-bit counter instance<br>
          &nbsp;&nbsp;counter #(<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.WIDTH(32)<br>
          &nbsp;&nbsp;) counter_32 (<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.clk(clk),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.rst_n(rst_n),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.enable(1'b1),<br>
          &nbsp;&nbsp;&nbsp;&nbsp;.count(count_32bit)<br>
          &nbsp;&nbsp;);<br>
          <br>
          endmodule
        </div>
        
        <h4>Common Instantiation Errors</h4>
        <ul>
          <li><strong>Port Mismatch</strong>: Connecting a signal to a non-existent port</li>
          <li><strong>Data Type Mismatch</strong>: Connecting signals of incompatible types</li>
          <li><strong>Width Mismatch</strong>: Connecting signals of different bit widths</li>
          <li><strong>Directional Mismatch</strong>: Connecting an output to an output</li>
          <li><strong>Missing Connections</strong>: Not connecting all required ports</li>
        </ul>
      `
    },
    {
      id: "6.4",
      title: "Design Reuse and Parameterization",
      content: `
        <h3>Creating Reusable Modules</h3>
        <p>Design reuse is a critical strategy for efficient hardware development. Well-designed, parameterized modules can be used across multiple projects or multiple times within a project.</p>
        
        <h4>Parameterization Techniques</h4>
        <p>Parameters make modules flexible and reusable by allowing configuration without changing the code:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module generic_shift_register #(<br>
          &nbsp;&nbsp;parameter WIDTH = 8,              // Data width<br>
          &nbsp;&nbsp;parameter STAGES = 4,             // Number of register stages<br>
          &nbsp;&nbsp;parameter RESET_VALUE = {WIDTH{1'b0}} // Reset value (default all 0s)<br>
          )(<br>
          &nbsp;&nbsp;input wire clk,<br>
          &nbsp;&nbsp;input wire rst_n,<br>
          &nbsp;&nbsp;input wire enable,<br>
          &nbsp;&nbsp;input wire [WIDTH-1:0] data_in,<br>
          &nbsp;&nbsp;output wire [WIDTH-1:0] data_out<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Internal registers - creates an array of registers<br>
          &nbsp;&nbsp;reg [WIDTH-1:0] shift_reg [0:STAGES-1];<br>
          &nbsp;&nbsp;integer i;<br>
          <br>
          &nbsp;&nbsp;// Shift register logic<br>
          &nbsp;&nbsp;always @(posedge clk or negedge rst_n) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (!rst_n) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Reset all registers to the reset value<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for (i = 0; i < STAGES; i = i + 1) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;shift_reg[i] <= RESET_VALUE;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end<br>
          &nbsp;&nbsp;&nbsp;&nbsp;end else if (enable) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Shift data through the registers<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;shift_reg[0] <= data_in;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;for (i = 1; i < STAGES; i = i + 1) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;shift_reg[i] <= shift_reg[i-1];<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end<br>
          &nbsp;&nbsp;&nbsp;&nbsp;end<br>
          &nbsp;&nbsp;end<br>
          <br>
          &nbsp;&nbsp;// Output is the last stage<br>
          &nbsp;&nbsp;assign data_out = shift_reg[STAGES-1];<br>
          <br>
          endmodule
        </div>
        
        <h4>Local Parameters</h4>
        <p>Unlike regular parameters which can be overridden during instantiation, local parameters (<code>localparam</code>) are fixed within the module:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module ram #(<br>
          &nbsp;&nbsp;parameter ADDR_WIDTH = 10,<br>
          &nbsp;&nbsp;parameter DATA_WIDTH = 32<br>
          )(<br>
          &nbsp;&nbsp;// Ports...<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Local parameter - cannot be overridden<br>
          &nbsp;&nbsp;localparam DEPTH = 1 << ADDR_WIDTH;<br>
          &nbsp;&nbsp;localparam BYTES_PER_WORD = DATA_WIDTH / 8;<br>
          <br>
          &nbsp;&nbsp;// Memory array<br>
          &nbsp;&nbsp;reg [DATA_WIDTH-1:0] mem [0:DEPTH-1];<br>
          <br>
          &nbsp;&nbsp;// Rest of implementation...<br>
          <br>
          endmodule
        </div>
        
        <h4>Parameter Dependencies</h4>
        <p>Parameters can depend on other parameters to create more flexible modules:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module fifo #(<br>
          &nbsp;&nbsp;parameter DEPTH = 16,<br>
          &nbsp;&nbsp;parameter DATA_WIDTH = 8,<br>
          &nbsp;&nbsp;// Derived parameters<br>
          &nbsp;&nbsp;parameter ADDR_WIDTH = $clog2(DEPTH)<br>
          )(<br>
          &nbsp;&nbsp;// Ports...<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Implementation...<br>
          <br>
          endmodule
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>The $clog2 Function</h4>
          <p>The $clog2 function computes the ceiling of the base-2 logarithm, which is useful for calculating address widths. For example, $clog2(16) = 4, because 2^4 = 16.</p>
        </div>
        
        <h4>Reuse Guidelines</h4>
        <p>To create truly reusable modules, follow these guidelines:</p>
        
        <ol>
          <li><strong>Parameterize Wisely</strong>: Make configurable anything that might need to change, but don't over-parameterize</li>
          <li><strong>Clear Documentation</strong>: Document parameters, ports, and behavior thoroughly</li>
          <li><strong>Input Validation</strong>: Add assertions or parameter checks to catch invalid configurations</li>
          <li><strong>Clean Interfaces</strong>: Create consistent, logical port interfaces</li>
          <li><strong>Standard Reset Behavior</strong>: Use consistent reset polarity and behavior</li>
          <li><strong>Minimize Dependencies</strong>: Avoid depending on specific external behavior</li>
        </ol>
        
        <h4>Complex Module Example: Parameterized FIFO</h4>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module fifo #(<br>
          &nbsp;&nbsp;parameter DATA_WIDTH = 8,<br>
          &nbsp;&nbsp;parameter DEPTH = 16,<br>
          &nbsp;&nbsp;parameter ALMOST_FULL_THRESHOLD = DEPTH-2,<br>
          &nbsp;&nbsp;parameter ALMOST_EMPTY_THRESHOLD = 2,<br>
          &nbsp;&nbsp;// Derived parameter - do not override<br>
          &nbsp;&nbsp;parameter ADDR_WIDTH = $clog2(DEPTH)<br>
          )(<br>
          &nbsp;&nbsp;// Clock and reset<br>
          &nbsp;&nbsp;input wire clk,<br>
          &nbsp;&nbsp;input wire rst_n,<br>
          <br>
          &nbsp;&nbsp;// Write interface<br>
          &nbsp;&nbsp;input wire wr_en,<br>
          &nbsp;&nbsp;input wire [DATA_WIDTH-1:0] wr_data,<br>
          &nbsp;&nbsp;output reg full,<br>
          &nbsp;&nbsp;output reg almost_full,<br>
          <br>
          &nbsp;&nbsp;// Read interface<br>
          &nbsp;&nbsp;input wire rd_en,<br>
          &nbsp;&nbsp;output reg [DATA_WIDTH-1:0] rd_data,<br>
          &nbsp;&nbsp;output reg empty,<br>
          &nbsp;&nbsp;output reg almost_empty,<br>
          <br>
          &nbsp;&nbsp;// Status<br>
          &nbsp;&nbsp;output reg [ADDR_WIDTH:0] fill_level<br>
          );<br>
          <br>
          &nbsp;&nbsp;// Memory array<br>
          &nbsp;&nbsp;reg [DATA_WIDTH-1:0] mem [0:DEPTH-1];<br>
          <br>
          &nbsp;&nbsp;// Pointers and counters<br>
          &nbsp;&nbsp;reg [ADDR_WIDTH-1:0] wr_ptr, rd_ptr;<br>
          &nbsp;&nbsp;reg [ADDR_WIDTH:0] count; // Extra bit for full/empty detection<br>
          <br>
          &nbsp;&nbsp;// Update fill level<br>
          &nbsp;&nbsp;always @* begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;fill_level = count;<br>
          &nbsp;&nbsp;end<br>
          <br>
          &nbsp;&nbsp;// Update status flags<br>
          &nbsp;&nbsp;always @* begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;empty = (count == 0);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;almost_empty = (count > 0) && (count <= ALMOST_EMPTY_THRESHOLD);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;full = (count == DEPTH);<br>
          &nbsp;&nbsp;&nbsp;&nbsp;almost_full = (count >= ALMOST_FULL_THRESHOLD);<br>
          &nbsp;&nbsp;end<br>
          <br>
          &nbsp;&nbsp;// Read and write logic<br>
          &nbsp;&nbsp;always @(posedge clk or negedge rst_n) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;if (!rst_n) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rd_ptr <= 0;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;wr_ptr <= 0;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count <= 0;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;end else begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Handle writes<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (wr_en && !full) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;mem[wr_ptr] <= wr_data;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;wr_ptr <= (wr_ptr == DEPTH-1) ? 0 : wr_ptr + 1;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end<br>
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Handle reads<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (rd_en && !empty) begin<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rd_data <= mem[rd_ptr];<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;rd_ptr <= (rd_ptr == DEPTH-1) ? 0 : rd_ptr + 1;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;end<br>
          <br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;// Update count<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;if (wr_en && !full && (!rd_en || empty))<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count <= count + 1;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;else if (rd_en && !empty && (!wr_en || full))<br>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;count <= count - 1;<br>
          &nbsp;&nbsp;&nbsp;&nbsp;end<br>
          &nbsp;&nbsp;end<br>
          <br>
          endmodule
        </div>
        
        <p>This FIFO module demonstrates several good design reuse principles:</p>
        <ul>
          <li>Well-parameterized for different data widths and depths</li>
          <li>Derived parameters automatically calculated</li>
          <li>Clean interface with separate read and write ports</li>
          <li>Status signals for monitoring FIFO state</li>
          <li>Standard reset behavior</li>
        </ul>
      `
    },
    {
      id: "6.5",
      title: "Key Takeaways",
      content: `
        <h3>Summary: Hierarchical Design and Module Instantiation</h3>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #6a0dad; margin: 20px 0;">
          <h4>Key Points</h4>
          <ul>
            <li>Hierarchical design is essential for managing complexity in large digital systems.</li>
            <li>Well-defined module interfaces with clear port declarations make designs more maintainable.</li>
            <li>Use named port connections when instantiating modules to improve readability and reduce errors.</li>
            <li>Parameterized modules promote design reuse and flexibility without code duplication.</li>
            <li>Local parameters (<code>localparam</code>) are useful for internal constants derived from module parameters.</li>
          </ul>
        </div>
        
        <h3>What's Next?</h3>
        <p>Now that you understand how to create modular, hierarchical designs, we'll move on to testbenches and verification. Testing is a critical part of the hardware design process, and Verilog provides powerful constructs for creating testbenches to verify your designs before implementation.</p>
        
        <h3>Reflection Questions</h3>
        <ol>
          <li>Consider a digital system you're familiar with (e.g., a calculator, a game console, or a traffic light controller). How would you break it down into a hierarchical structure of modules?</li>
          <li>What are the trade-offs between making a module highly parameterized versus creating multiple specialized modules?</li>
          <li>How might the choice of port types (input/output/inout, wire/reg) affect the reusability of a module?</li>
        </ol>
      `
    }
  ],
  quiz: {
    title: "Hierarchical Design and Module Instantiation Quiz",
    description: "Test your understanding of modular design principles and module instantiation in Verilog",
    questions: [
      {
        id: "q6_1",
        question: "Which port connection method is considered the best practice for module instantiation?",
        options: [
          { id: "a", text: "Positional connection" },
          { id: "b", text: "Named (explicit) connection" },
          { id: "c", text: "Named (implicit) connection" },
          { id: "d", text: "Either positional or named connections are equally good" }
        ],
        correctAnswer: "b",
        explanation: "Named (explicit) connections (.port_name(signal_name)) are considered best practice because they clearly show which port connects to which signal, are less prone to errors when port lists change, and allow connections in any order."
      },
      {
        id: "q6_2",
        question: "What is the correct syntax for a parameterized module instantiation?",
        options: [
          { id: "a", text: "counter #WIDTH=16 c1(.clk(clk), .rst_n(rst_n), .enable(en), .count(cnt));" },
          { id: "b", text: "counter c1(.clk(clk), .rst_n(rst_n), .enable(en), .count(cnt), #WIDTH=16);" },
          { id: "c", text: "counter #(WIDTH=16) c1(.clk(clk), .rst_n(rst_n), .enable(en), .count(cnt));" },
          { id: "d", text: "counter #(.WIDTH=16) c1(.clk(clk), .rst_n(rst_n), .enable(en), .count(cnt));" }
        ],
        correctAnswer: "d",
        explanation: "The correct syntax is counter #(.WIDTH=16) c1(...);. The # symbol indicates parameter overriding, and using .PARAM_NAME format makes it clear which parameter is being overridden."
      },
      {
        id: "q6_3",
        question: "Which of the following is NOT a benefit of hierarchical design?",
        options: [
          { id: "a", text: "Reduced complexity" },
          { id: "b", text: "Improved reusability" },
          { id: "c", text: "Faster simulation speed" },
          { id: "d", text: "Easier team collaboration" }
        ],
        correctAnswer: "c",
        explanation: "Hierarchical design does not necessarily improve simulation speed and can sometimes slow it down due to the overhead of module boundaries. The benefits include reduced complexity, improved reusability, and easier team collaboration."
      },
      {
        id: "q6_4",
        question: "What happens when you connect a 4-bit signal to an 8-bit input port?",
        options: [
          { id: "a", text: "Synthesis error" },
          { id: "b", text: "The 4-bit signal is zero-extended to 8 bits" },
          { id: "c", text: "The 4-bit signal is sign-extended to 8 bits" },
          { id: "d", text: "Only the lower 4 bits of the input port are connected" }
        ],
        correctAnswer: "b",
        explanation: "When connecting a narrower signal to a wider port, the signal is zero-extended by default. For example, connecting a 4-bit signal to an 8-bit port will add zeros to the most significant bits."
      },
      {
        id: "q6_5",
        question: "What is the purpose of the $clog2 function in a module parameter declaration?",
        options: [
          { id: "a", text: "To calculate logarithms during simulation" },
          { id: "b", text: "To determine the minimum number of bits needed to represent a value" },
          { id: "c", text: "To convert between different number bases" },
          { id: "d", text: "To round up to the nearest power of 2" }
        ],
        correctAnswer: "b",
        explanation: "The $clog2 function calculates the ceiling of the base-2 logarithm, which gives the minimum number of bits needed to represent a value. For example, $clog2(8) = 3, meaning you need at least 3 bits to represent 8 different values."
      },
      {
        id: "q6_6",
        question: "What is the correct port type for an output that will be assigned a value in an always block?",
        options: [
          { id: "a", text: "output wire" },
          { id: "b", text: "output reg" },
          { id: "c", text: "output logic" },
          { id: "d", text: "output var" }
        ],
        correctAnswer: "b",
        explanation: "Output ports that are assigned values within procedural blocks (always blocks) should be declared as 'output reg'. This indicates that the port behaves like a register and can store values assigned in the procedural block."
      },
      {
        id: "q6_7",
        question: "How can you leave a port unconnected when using named port connections?",
        options: [
          { id: "a", text: "Omit the port entirely from the connection list" },
          { id: "b", text: "Use .port_name() with nothing inside the parentheses" },
          { id: "c", text: "Connect the port to a special 'unconnected' keyword" },
          { id: "d", text: "Connect the port to a 'z' value" }
        ],
        correctAnswer: "a",
        explanation: "When using named port connections, you can simply omit the port from the connection list to leave it unconnected. If the port has a default value in the module definition, that value will be used."
      },
      {
        id: "q6_8",
        question: "What is the most appropriate granularity for modules in a hierarchical design?",
        options: [
          { id: "a", text: "Always create the smallest possible modules for maximum reusability" },
          { id: "b", text: "Use only a few large modules to minimize simulation overhead" },
          { id: "c", text: "Balance module size based on functionality, reusability, and maintainability" },
          { id: "d", text: "Follow industry standard guidelines that specify exactly how large modules should be" }
        ],
        correctAnswer: "c",
        explanation: "The appropriate module granularity involves balancing several factors: functionality (modules should perform cohesive functions), reusability (modules should be general enough to reuse), and maintainability (modules should be simple enough to understand but not so small that the hierarchy becomes unwieldy)."
      }
    ]
  }
};

export default chapter6; 