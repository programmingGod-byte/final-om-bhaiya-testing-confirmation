const chapter13 = {
  id: 13,
  title: "SystemVerilog: Language Extensions and Features",
  description: "Explore SystemVerilog's powerful language extensions that enhance both design and verification capabilities",
  estimatedTime: "3 hours",
  completed: false,
  sections: [
    {
      id: "13.1",
      title: "Introduction to SystemVerilog",
      content: `
        <h3>Evolution from Verilog to SystemVerilog</h3>
        <p>SystemVerilog represents a significant advancement in hardware description and verification languages, extending Verilog with powerful new features for both design and verification.</p>
        
        <h4>SystemVerilog Background</h4>
        <p>SystemVerilog began as an extension of Verilog and evolved into IEEE standard 1800. It incorporates features from multiple languages:</p>
        
        <ul>
          <li><strong>Verilog HDL</strong>: Base hardware description capabilities</li>
          <li><strong>C/C++</strong>: Programming constructs and object-oriented concepts</li>
          <li><strong>SUPERLOG</strong>: Hardware verification language concepts</li>
          <li><strong>OpenVera</strong>: Constrained random stimulus generation and functional coverage</li>
        </ul>
        
        <h4>Key Goals of SystemVerilog</h4>
        <p>SystemVerilog was developed to address several limitations in traditional Verilog:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0;">
          <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
            <tr style="background-color:#f0f0f0">
              <th>Goal</th>
              <th>Description</th>
              <th>Benefits</th>
            </tr>
            <tr>
              <td><strong>Enhanced Design Capabilities</strong></td>
              <td>More powerful data types, interfaces, and design constructs</td>
              <td>More compact and expressive RTL code</td>
            </tr>
            <tr>
              <td><strong>Unified Language</strong></td>
              <td>Single language for both design and verification</td>
              <td>Simplified tool flows and learning curve</td>
            </tr>
            <tr>
              <td><strong>Advanced Verification</strong></td>
              <td>Built-in constructs for modern verification methodologies</td>
              <td>More efficient and comprehensive testing</td>
            </tr>
            <tr>
              <td><strong>Object-Oriented Approach</strong></td>
              <td>Classes, inheritance, and polymorphism</td>
              <td>Better code organization and reuse</td>
            </tr>
            <tr>
              <td><strong>Assertions</strong></td>
              <td>Formal specification of design properties</td>
              <td>Automated checking of design intent</td>
            </tr>
          </table>
        </div>
        
        <h4>SystemVerilog Use Models</h4>
        <p>SystemVerilog can be used in three primary ways:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0;">
          <ol>
            <li>
              <strong>SystemVerilog for RTL Design</strong>
              <ul>
                <li>Enhanced data types (logic, enum, struct, union)</li>
                <li>Improved procedural blocks (always_comb, always_ff, always_latch)</li>
                <li>Interfaces and modports for better connectivity modeling</li>
                <li>Enhanced parameterization and generate constructs</li>
              </ul>
            </li>
            <li>
              <strong>SystemVerilog for Assertions</strong>
              <ul>
                <li>Immediate assertions for basic checking</li>
                <li>Concurrent assertions for temporal properties</li>
                <li>Formal verification support</li>
                <li>Assumptions, restrictions, and coverage specification</li>
              </ul>
            </li>
            <li>
              <strong>SystemVerilog for Verification</strong>
              <ul>
                <li>Object-oriented programming features</li>
                <li>Constrained random stimulus generation</li>
                <li>Functional coverage collection</li>
                <li>Testbench automation constructs (mailboxes, semaphores, etc.)</li>
                <li>Direct Programming Interface (DPI) for C/C++ integration</li>
              </ul>
            </li>
          </ol>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Note on Tool Support</h4>
          <p>While SystemVerilog is an industry standard, tool support varies across vendors. When writing SystemVerilog code, be aware of which features are supported by your specific synthesis and simulation tools. The verification features of SystemVerilog are generally supported in simulation only and not intended for synthesis.</p>
        </div>
      `
    },
    {
      id: "13.2",
      title: "Enhanced Data Types and Operators",
      content: `
        <h3>Improved Type System</h3>
        <p>SystemVerilog introduces a more robust type system that addresses many limitations in traditional Verilog data types.</p>
        
        <h4>Two-State vs. Four-State Data Types</h4>
        <p>SystemVerilog provides both traditional four-state types and more efficient two-state types:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0;">
          <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
            <tr style="background-color:#f0f0f0">
              <th>Category</th>
              <th>Data Types</th>
              <th>Value States</th>
              <th>Typical Usage</th>
            </tr>
            <tr>
              <td><strong>Four-State</strong></td>
              <td>logic, reg, wire, integer, time</td>
              <td>0, 1, X (unknown), Z (high-impedance)</td>
              <td>Hardware modeling with unknown states</td>
            </tr>
            <tr>
              <td><strong>Two-State</strong></td>
              <td>bit, byte, shortint, int, longint</td>
              <td>0, 1 only</td>
              <td>Testbench code, faster simulation</td>
            </tr>
          </table>
        </div>
        
        <h4>The 'logic' Type</h4>
        <p>The 'logic' type is a versatile four-state data type that replaces 'reg' and 'wire' in many contexts:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module counter (
            input  logic        clk,
            input  logic        rst_n,
            input  logic        enable,
            output logic [7:0]  count
          );
            // logic can be used on left side of procedural assignment
            // and can also be driven by continuous assignment
            always_ff @(posedge clk or negedge rst_n) begin
              if (!rst_n)
                count <= 8'h00;
              else if (enable)
                count <= count + 1;
            end
          endmodule
        </div>
        
        <h4>User-Defined Types</h4>
        <p>SystemVerilog enables custom data type definitions:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Enumerated types
          typedef enum logic [1:0] {IDLE=2'b00, BUSY=2'b01, DONE=2'b10, ERROR=2'b11} state_t;
          state_t current_state, next_state;
          
          // Structures for grouping related data
          typedef struct packed {
            logic [31:0] address;
            logic [31:0] data;
            logic [3:0]  byte_enable;
            logic        read_write_n;  // 1=read, 0=write
          } bus_transaction_t;
          
          bus_transaction_t transaction;
          
          // Packed arrays
          logic [7:0][3:0] packed_array;  // 8 elements, each 4 bits
          // Access: packed_array[2] = 4'hF;
          
          // Unpacked arrays
          int unpacked_array[10];         // 10 elements of type int
          // Access: unpacked_array[5] = 42;
          
          // Associative arrays
          int memory_model[string];       // Key is string, value is int
          // Usage: memory_model["address1"] = 100;
          
          // Queues - dynamic arrays
          int data_queue[$];             // Unbounded queue of integers
          // Operations: data_queue.push_back(50); item = data_queue.pop_front();
        </div>
        
        <h4>Enhanced Operators</h4>
        <p>SystemVerilog adds powerful operators for common operations:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0;">
          <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
            <tr style="background-color:#f0f0f0">
              <th>Operator</th>
              <th>Description</th>
              <th>Example</th>
            </tr>
            <tr>
              <td><strong>===/!==</strong></td>
              <td>Four-state equality (includes X, Z)</td>
              <td>if (signal === 'x) // true only if signal is exactly 'x</td>
            </tr>
            <tr>
              <td><strong>inside</strong></td>
              <td>Set membership test</td>
              <td>if (value inside {2, 4, 6, 8}) // true if value is even from 2-8</td>
            </tr>
            <tr>
              <td><strong>++/--</strong></td>
              <td>Increment/decrement</td>
              <td>count++; --index;</td>
            </tr>
            <tr>
              <td><strong>+=, -=, *=, etc.</strong></td>
              <td>Assignment operators</td>
              <td>sum += value; // same as: sum = sum + value</td>
            </tr>
            <tr>
              <td><strong><<< / >>></strong></td>
              <td>Arithmetic shifts</td>
              <td>signed_value = signed_value >>> 2; // arithmetic right shift</td>
            </tr>
          </table>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>SystemVerilog Type Casting</h4>
          <p>SystemVerilog provides explicit type casting methods:</p>
          <ul>
            <li><strong>'()</strong>: Explicit type casting operator
              <div style="font-family: monospace; margin-top: 5px;">
                int a = 32'hABCD1234;<br>
                byte b = byte'(a); // b contains the 8 LSBs: 0x34
              </div>
            </li>
            <li><strong>static casting</strong>: Fixed compile-time casting for compatible classes</li>
            <li><strong>dynamic casting</strong>: Runtime checked casting with classes (similar to C++)</li>
          </ul>
        </div>
      `
    },
    {
      id: "13.3",
      title: "Procedural Blocks and Interfaces",
      content: `
        <h3>Improved Procedural Blocks</h3>
        <p>SystemVerilog introduces specialized always blocks that communicate design intent and help prevent common coding errors.</p>
        
        <h4>Specialized Always Blocks</h4>
        <p>Instead of the generic 'always' block, SystemVerilog offers purpose-specific variants:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Combinational logic - automatically sensitive to all signals read inside
          always_comb begin
            sum = a + b;  // Tool will check that this is truly combinational
          end
          
          // Sequential logic - for flip-flop modeling
          always_ff @(posedge clk or negedge rst_n) begin
            if (!rst_n)
              q <= 1'b0;
            else
              q <= d;  // Tool will check that this is truly sequential
          end
          
          // Latches - explicitly indicate latch inference
          always_latch begin
            if (enable)
              latch_out <= data_in;  // Transparent when enable=1
          end
        </div>
        
        <h4>Interfaces: Modular Port Connections</h4>
        <p>Interfaces bundle related signals and provide a structured approach to connecting modules:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Define a memory interface
          interface memory_if #(
            parameter ADDR_WIDTH = 32,
            parameter DATA_WIDTH = 32
          );
            logic                    clk;
            logic                    reset_n;
            logic [ADDR_WIDTH-1:0]   address;
            logic [DATA_WIDTH-1:0]   write_data;
            logic [DATA_WIDTH-1:0]   read_data;
            logic                    write_enable;
            logic                    read_enable;
            logic                    ready;
            
            // Modport for the master perspective
            modport master (
              output address, write_data, write_enable, read_enable,
              input  read_data, ready,
              input  clk, reset_n
            );
            
            // Modport for the slave perspective
            modport slave (
              input  address, write_data, write_enable, read_enable,
              output read_data, ready,
              input  clk, reset_n
            );
            
            // Tasks and functions can be defined inside interfaces
            task automatic wait_for_ready();
              while (!ready) @(posedge clk);
            endtask
          endinterface
          
          // Using the interface in a module
          module memory_controller (
            memory_if.master mem  // Interface instance with modport
          );
            // Access interface signals directly
            always_ff @(posedge mem.clk or negedge mem.reset_n) begin
              if (!mem.reset_n) begin
                // Reset logic
              end else if (mem.write_enable) begin
                // Write operation
              end
            end
          endmodule
          
          // Memory model using the slave modport
          module memory_model (
            memory_if.slave mem
          );
            // Memory implementation
            logic [mem.DATA_WIDTH-1:0] storage [2**mem.ADDR_WIDTH-1:0];
            
            always_ff @(posedge mem.clk) begin
              if (mem.write_enable)
                storage[mem.address] <= mem.write_data;
              if (mem.read_enable)
                mem.read_data <= storage[mem.address];
            end
          endmodule
          
          // Top-level instantiation
          module system_top;
            // Create interface instance
            memory_if #(
              .ADDR_WIDTH(16),
              .DATA_WIDTH(32)
            ) mem_bus();
            
            // Connect clock and reset
            always #5 mem_bus.clk = ~mem_bus.clk;
            initial begin
              mem_bus.clk = 0;
              mem_bus.reset_n = 0;
              #20 mem_bus.reset_n = 1;
            end
            
            // Instantiate modules with interface connections
            memory_controller u_ctrl (
              .mem(mem_bus)  // Connect interface
            );
            
            memory_model u_mem (
              .mem(mem_bus)  // Same interface, different modport
            );
          endmodule
        </div>
        
        <h4>Interface Benefits</h4>
        <p>Interfaces provide significant advantages over traditional port connections:</p>
        
        <ul>
          <li><strong>Simplified Module Connections</strong>: Single port replaces multiple signals</li>
          <li><strong>Automatic Updates</strong>: Adding signals to an interface automatically updates all connected modules</li>
          <li><strong>Direction Checking</strong>: Modports enforce signal direction at module boundaries</li>
          <li><strong>Encapsulation</strong>: Tasks and functions can be included with the interface</li>
          <li><strong>Protocol Abstraction</strong>: Interface can encapsulate protocol details</li>
          <li><strong>Verification Support</strong>: Interfaces can include assertions and coverage</li>
        </ul>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Virtual Interfaces</h4>
          <p>SystemVerilog also supports virtual interfaces, which allow interfaces to be passed to classes in a testbench environment. This creates a bridge between the static, module-based design world and the dynamic, object-oriented verification world.</p>
          <pre style="font-family: monospace; margin-top: 10px;">
class driver;
  virtual memory_if.master vif;  // Virtual interface handle
  
  function new(virtual memory_if.master _vif);
    vif = _vif;  // Store the interface
  endfunction
  
  task run();
    // Access DUT through the virtual interface
    vif.write_enable = 1'b1;
    vif.address = 32'h1000;
    vif.write_data = 32'hABCD;
    @(posedge vif.clk);
  endtask
endclass</pre>
        </div>
      `
    },
    {
      id: "13.4",
      title: "Classes and Object-Oriented Programming",
      content: `
        <h3>Object-Oriented Programming in SystemVerilog</h3>
        <p>SystemVerilog introduces full object-oriented programming capabilities, primarily used in verification environments.</p>
        
        <h4>Classes and Objects</h4>
        <p>SystemVerilog classes provide data encapsulation and modular code organization:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Basic class definition
          class Transaction;
            // Properties (data members)
            bit [31:0]  address;
            bit [31:0]  data;
            bit         read_write;  // 0=write, 1=read
            int         delay;
            string      name;
            
            // Constructor method
            function new(string name = "unnamed_trans");
              this.name = name;
              this.address = 0;
              this.data = 0;
              this.read_write = 0;
              this.delay = 1;
            endfunction
            
            // Methods
            function void display();
              $display("Transaction %s: %s at addr=%h, data=%h, delay=%0d",
                      name, read_write ? "READ" : "WRITE", address, data, delay);
            endfunction
            
            function Transaction copy();
              Transaction t = new();
              t.address = this.address;
              t.data = this.data;
              t.read_write = this.read_write;
              t.delay = this.delay;
              t.name = {this.name, "_copy"};
              return t;
            endfunction
          endclass
          
          // Class usage
          module tb_top;
            initial begin
              // Create object
              Transaction tr = new("tr1");
              
              // Set properties
              tr.address = 32'h1000_0000;
              tr.data = 32'hDEAD_BEEF;
              tr.read_write = 1;  // Read
              
              // Call methods
              tr.display();
              
              // Create a copy
              Transaction tr_copy = tr.copy();
              tr_copy.display();
              
              // Dynamic allocation
              Transaction tr_array[];  // Dynamic array of Transaction objects
              tr_array = new[5];      // Allocate array
              
              for (int i=0; i<5; i++) begin
                tr_array[i] = new($sformatf("tr_%0d", i));
                tr_array[i].address = 'h1000 + i*4;
              end
            end
          endmodule
        </div>
        
        <h4>Inheritance and Polymorphism</h4>
        <p>SystemVerilog supports class hierarchies with inheritance and polymorphism:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Base class
          class BaseTransaction;
            bit [31:0] address;
            bit [31:0] data;
            
            function new();
              address = 0;
              data = 0;
            endfunction
            
            // Virtual method
            virtual function void display();
              $display("Base Transaction: addr=%h, data=%h", address, data);
            endfunction
          endclass
          
          // Derived class with inheritance
          class BurstTransaction extends BaseTransaction;
            int burst_length;
            bit [31:0] burst_data[];
            
            function new();
              super.new();  // Call parent constructor
              burst_length = 1;
              burst_data = new[1];
              burst_data[0] = 0;
            endfunction
            
            // Method override
            virtual function void display();
              $display("Burst Transaction: addr=%h, first_data=%h, length=%0d",
                      address, data, burst_length);
              for (int i=0; i<burst_length; i++)
                $display("  burst_data[%0d] = %h", i, burst_data[i]);
            endfunction
            
            // Extended functionality
            function void set_burst(int length);
              burst_length = length;
              burst_data = new[length];
              for (int i=0; i<length; i++)
                burst_data[i] = $random;
            endfunction
          endclass
          
          // Polymorphism example
          module tb_poly;
            initial begin
              // Polymorphic array
              BaseTransaction trans_list[2];
              
              // Assign different object types
              trans_list[0] = new();  // Base type
              trans_list[1] = new BurstTransaction();  // Derived type
              
              // Configure objects
              trans_list[0].address = 32'h1000;
              trans_list[0].data = 32'hAAAA;
              
              trans_list[1].address = 32'h2000;
              trans_list[1].data = 32'hBBBB;
              
              // Cast to access derived class methods
              BurstTransaction burst;
              $cast(burst, trans_list[1]);  // Runtime type check
              burst.set_burst(4);
              
              // Polymorphic method calls
              for (int i=0; i<2; i++)
                trans_list[i].display();  // Calls appropriate override
            end
          endmodule
        </div>
        
        <h4>Static Class Members</h4>
        <p>Static members are shared across all objects of a class:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          class TransactionManager;
            static int transaction_count = 0;
            int id;
            
            function new();
              transaction_count++;
              id = transaction_count;
            endfunction
            
            function void display();
              $display("Transaction ID: %0d (total: %0d)", id, transaction_count);
            endfunction
            
            // Static method
            static function void report_count();
              $display("Total transactions created: %0d", transaction_count);
            endfunction
          endclass
          
          // Usage
          module tb_static;
            initial begin
              TransactionManager tm1 = new();
              TransactionManager tm2 = new();
              TransactionManager tm3 = new();
              
              tm1.display();  // ID: 1 (total: 3)
              tm2.display();  // ID: 2 (total: 3)
              tm3.display();  // ID: 3 (total: 3)
              
              // Call static method directly on the class
              TransactionManager::report_count();  // Total: 3
            end
          endmodule
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Design vs. Verification Focus</h4>
          <p>It's important to note that while SystemVerilog classes are powerful, they are primarily intended for verification environments rather than synthesizable design code. Classes and object-oriented programming features are generally not synthesizable and should be used in testbenches, verification components, and simulation models.</p>
        </div>
      `
    },
    {
      id: "13.5",
      title: "Assertions and Functional Coverage",
      content: `
        <h3>Design Verification with SystemVerilog</h3>
        <p>SystemVerilog provides powerful verification capabilities through assertions and functional coverage.</p>
        
        <h4>Assertion-Based Verification</h4>
        <p>Assertions specify expected behavior and automatically check for violations:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0;">
          <table border="1" cellpadding="8" cellspacing="0" style="width:100%; border-collapse: collapse;">
            <tr style="background-color:#f0f0f0">
              <th>Assertion Type</th>
              <th>Description</th>
              <th>Usage</th>
            </tr>
            <tr>
              <td><strong>Immediate Assertions</strong></td>
              <td>Procedural statements that check conditions at a specific moment</td>
              <td>Testbench data checking, validating assumptions</td>
            </tr>
            <tr>
              <td><strong>Concurrent Assertions</strong></td>
              <td>Temporal assertions that check behavior across time</td>
              <td>Protocol checking, sequence verification</td>
            </tr>
          </table>
        </div>
        
        <h4>Immediate Assertions</h4>
        <p>Immediate assertions are procedural statements executed like other simulation statements:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Basic immediate assertion
          always @(posedge clk) begin
            // Check that reset is active for at least 3 cycles
            if (reset_count == 1) begin
              assert (reset == 1) else
                $error("Reset must be active at the start of reset sequence");
            end
            
            // Different assertion actions
            assert (ready !== 1'bx)
              else $warning("Ready signal is unknown");
              
            // Assert with pass statement
            assert (addr < 1024)
              else $error("Address out of range")
              $info("Address within range: %h", addr);
          end
        </div>
        
        <h4>Concurrent Assertions</h4>
        <p>Concurrent assertions check behavior across multiple clock cycles:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          // Basic syntax for concurrent assertions
          module assertion_examples (
            input logic clk, reset_n,
            input logic req, gnt, abort, ready
          );
          
            // Simple property: request must be followed by grant
            property req_gnt;
              @(posedge clk) req |-> ##[1:5] gnt;
            endproperty
            
            // Assert the property
            assert property (req_gnt)
              else $error("Grant not received within 5 cycles after request");
            
            // More complex property with disable condition
            property req_gnt_unless_abort;
              @(posedge clk) disable iff (!reset_n)
              req |-> (!abort throughout ##[1:5] gnt);
            endproperty
            
            assert property (req_gnt_unless_abort);
            
            // Sequence definitions can be reused
            sequence req_to_ready;
              req ##[1:5] gnt ##1 ready;
            endsequence
            
            // Using sequence in a property
            property transaction_completes;
              @(posedge clk) disable iff (!reset_n)
              req |-> req_to_ready;
            endproperty
            
            // Named assertion
            REQ_READY_A: assert property (transaction_completes);
            
            // Cover property - track when a sequence occurs
            cover property (transaction_completes);
          endmodule
        </div>
        
        <h4>Functional Coverage</h4>
        <p>Functional coverage measures how thoroughly a design has been verified:</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; margin: 20px 0; font-family: monospace;">
          module coverage_example;
            // Design signals
            logic [1:0] mode;
            logic [7:0] addr;
            logic       read_write;
            logic       valid;
            logic [1:0] burst_type;
            logic [2:0] burst_len;
            
            // Covergroup definition
            covergroup bus_coverage @(posedge clk);
              // Cover different mode values
              MODE: coverpoint mode {
                bins mode_0 = {0};
                bins mode_1 = {1};
                bins mode_2 = {2};
                bins mode_3 = {3};
              }
              
              // Address ranges
              ADDR: coverpoint addr {
                bins low    = {[0:63]};
                bins mid    = {[64:191]};
                bins high   = {[192:255]};
              }
              
              // Transaction type
              TYPE: coverpoint read_write {
                bins read  = {1};
                bins write = {0};
              }
              
              // Cross coverage - combinations of variables
              MODE_X_TYPE: cross MODE, TYPE;
              
              // Burst properties
              BURST: coverpoint {valid, burst_type, burst_len} {
                // Wildcard matching for specific combinations
                bins single = {3'b1_00_0};  // Single transfer
                bins incr4  = {3'b1_01_3};  // Incrementing burst length 4
                bins incr8  = {3'b1_01_7};  // Incrementing burst length 8
                bins wrap4  = {3'b1_10_3};  // Wrapping burst length 4
                // Use wildcard for other combinations
                bins others = default;
              }
            endgroup
            
            // Instantiate the covergroup
            bus_coverage cg = new();
            
            // Stimulate the design
            initial begin
              // Various test scenarios to achieve coverage...
              
              // Print coverage at the end
              $display("Coverage = %0.2f%%", cg.get_coverage());
            end
          endmodule
        </div>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #ff9800; margin: 20px 0;">
          <h4>Verification Methodology Integration</h4>
          <p>SystemVerilog assertions and coverage are typically used within standard verification methodologies like UVM (Universal Verification Methodology). These methodologies provide frameworks for building scalable, reusable verification environments.</p>
          <p>Key verification methodology components include:</p>
          <ul>
            <li>Constrained random stimulus generation</li>
            <li>Self-checking testbenches</li>
            <li>Coverage-driven verification</li>
            <li>Layered verification architecture</li>
            <li>Reusable verification components</li>
          </ul>
        </div>
      `
    },
    {
      id: "13.6",
      title: "Key Takeaways",
      content: `
        <h3>Summary: SystemVerilog Extensions and Features</h3>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-left: 5px solid #6a0dad; margin: 20px 0;">
          <h4>Key Points</h4>
          <ul>
            <li>SystemVerilog extends Verilog with powerful features for both design and verification.</li>
            <li>Enhanced data types and operators improve code clarity and reduce common errors.</li>
            <li>Specialized procedural blocks and interfaces create more robust, maintainable RTL code.</li>
            <li>Object-oriented programming capabilities support sophisticated testbench development.</li>
            <li>Assertions and functional coverage enable automated verification of design correctness.</li>
          </ul>
        </div>
        
        <h3>What's Next?</h3>
        <p>In the next chapter, we'll explore advanced verification techniques using SystemVerilog, with a focus on building complete verification environments. You'll learn about testbench architecture, stimulus generation, transaction-level modeling, and verification methodology fundamentals.</p>
        
        <h3>Reflection Questions</h3>
        <ol>
          <li>How might you refactor a traditional Verilog design to take advantage of SystemVerilog's enhanced RTL features?</li>
          <li>In what ways do SystemVerilog interfaces improve design modularity and verification compared to traditional port connections?</li>
          <li>Consider a protocol like SPI or I2C. How would you use assertions to verify the correct behavior of an implementation?</li>
        </ol>
      `
    }
  ],
  quiz: {
    title: "SystemVerilog Features Quiz",
    description: "Test your understanding of SystemVerilog's enhanced features and capabilities",
    questions: [
      {
        id: "q13_1",
        question: "What is the main advantage of SystemVerilog's 'logic' data type over Verilog's 'reg'?",
        options: [
          { id: "a", text: "It automatically initializes to zero" },
          { id: "b", text: "It can be driven by multiple sources" },
          { id: "c", text: "It can represent all four logic states (0, 1, X, Z) and can be used for both variables and nets" },
          { id: "d", text: "It uses less memory in simulation" }
        ],
        correctAnswer: "c",
        explanation: "The 'logic' data type in SystemVerilog can represent all four logic states (0, 1, X, Z) and can be used for both variables and nets. This reduces confusion by eliminating the semantic difference between 'reg' (which doesn't necessarily represent a register) and 'wire', making code clearer and reducing errors related to inappropriate data type usage."
      },
      {
        id: "q13_2",
        question: "Which SystemVerilog feature allows you to group related signals and define their behavior as a unit?",
        options: [
          { id: "a", text: "Packages" },
          { id: "b", text: "Interfaces" },
          { id: "c", text: "Structs" },
          { id: "d", text: "Classes" }
        ],
        correctAnswer: "b",
        explanation: "SystemVerilog interfaces allow you to group related signals together and define their behavior as a unit. They provide a clean way to connect modules, encapsulate protocol details, and ensure consistency. Interfaces can include modports to specify signal directions, tasks and functions to define behavior, and can be parameterized for flexibility."
      },
      {
        id: "q13_3",
        question: "What is the purpose of a SystemVerilog 'package'?",
        options: [
          { id: "a", text: "To create complex data structures like arrays and queues" },
          { id: "b", text: "To define communication interfaces between modules" },
          { id: "c", text: "To group related definitions (types, parameters, functions) for reuse across multiple files" },
          { id: "d", text: "To implement object-oriented programming concepts" }
        ],
        correctAnswer: "c",
        explanation: "SystemVerilog packages group related definitions (types, parameters, functions, etc.) for reuse across multiple files. They provide namespacing to avoid naming conflicts and support for modular code organization. Packages are imported where needed using 'import' statements, making shared definitions easily accessible throughout a design or verification environment."
      },
      {
        id: "q13_4",
        question: "Which of the following is NOT a valid data type in SystemVerilog?",
        options: [
          { id: "a", text: "enum" },
          { id: "b", text: "struct" },
          { id: "c", text: "map" },
          { id: "d", text: "union" }
        ],
        correctAnswer: "c",
        explanation: "SystemVerilog does not have a built-in 'map' data type like some other programming languages. It does support 'enum' for enumerated types, 'struct' for grouping related variables, and 'union' for sharing memory between different variable types. For associative collections, SystemVerilog provides associative arrays (e.g., int my_array[string]) instead of a map type."
      },
      {
        id: "q13_5",
        question: "What is the difference between a concurrent assertion and an immediate assertion in SystemVerilog?",
        options: [
          { id: "a", text: "Concurrent assertions are synthesizable; immediate assertions are not" },
          { id: "b", text: "Concurrent assertions evaluate continuously in a separate thread; immediate assertions execute like procedural statements" },
          { id: "c", text: "Concurrent assertions can only be used in testbenches; immediate assertions can be used anywhere" },
          { id: "d", text: "Concurrent assertions are a SystemVerilog feature; immediate assertions exist in Verilog" }
        ],
        correctAnswer: "b",
        explanation: "Concurrent assertions evaluate continuously in a separate thread, monitoring behavior across time based on a clock, while immediate assertions execute like procedural statements at a specific point in simulation time. Concurrent assertions use temporal properties to verify behavior across multiple clock cycles and are ideal for protocol checking, while immediate assertions check conditions at specific moments."
      },
      {
        id: "q13_6",
        question: "What SystemVerilog feature would you use to measure whether specific scenarios or conditions have been encountered during simulation?",
        options: [
          { id: "a", text: "Assertions" },
          { id: "b", text: "Functional coverage" },
          { id: "c", text: "Classes" },
          { id: "d", text: "Task automation" }
        ],
        correctAnswer: "b",
        explanation: "Functional coverage is used to measure whether specific scenarios or conditions have been encountered during simulation. It tracks design and test scenario coverage metrics defined by the user through covergroups and coverpoints. Unlike code coverage (which measures which lines/branches of code have executed), functional coverage focuses on design features and behaviors that are important to verify."
      },
      {
        id: "q13_7",
        question: "Which SystemVerilog feature would you use to create a reusable verification component that can generate random stimuli within constraints?",
        options: [
          { id: "a", text: "Packages" },
          { id: "b", text: "Interfaces" },
          { id: "c", text: "Classes with constrained randomization" },
          { id: "d", text: "Virtual interfaces" }
        ],
        correctAnswer: "c",
        explanation: "Classes with constrained randomization are used to create reusable verification components that can generate random stimuli within specified constraints. SystemVerilog classes support object-oriented programming concepts and can include random variables with constraints that define legal values or relationships. This enables sophisticated test generation where randomization explores the test space while adhering to protocol rules and design requirements."
      },
      {
        id: "q13_8",
        question: "What does the 'foreach' statement do in SystemVerilog?",
        options: [
          { id: "a", text: "It creates multiple instances of modules in parallel" },
          { id: "b", text: "It iterates through all elements of an array or structure" },
          { id: "c", text: "It executes tasks in parallel" },
          { id: "d", text: "It checks assertions for each signal in an interface" }
        ],
        correctAnswer: "b",
        explanation: "The 'foreach' statement in SystemVerilog iterates through all elements of an array or structure. It provides a convenient way to process all elements without explicitly managing indices or boundaries. For example: 'foreach(array[i]) sum += array[i];' or 'foreach(array[i, j]) array[i][j] = 0;' for multidimensional arrays. This makes code more readable and less error-prone compared to traditional for loops with explicit indexing."
      }
    ]
  }
};

export default chapter13; 