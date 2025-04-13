/**
 * Verilog Fundamentals Module
 * 
 * This module covers the basics of Verilog HDL and digital design.
 */

// Import chapters
import chapter1 from './verilogChapters/chapter1.js';
import chapter2 from './verilogChapters/chapter2.js';
import chapter3 from './verilogChapters/chapter3.js';
import chapter4 from './verilogChapters/chapter4.js';
import chapter5 from './verilogChapters/chapter5.js';
import chapter6 from './verilogChapters/chapter6.js';
import chapter7 from './verilogChapters/chapter7.js';
import chapter8 from './verilogChapters/chapter8.js';
import chapter9 from './verilogChapters/chapter9.js';
import chapter10 from './verilogChapters/chapter10.js';
import chapter11 from './verilogChapters/chapter11.js';
import chapter12 from './verilogChapters/chapter12.js';
import chapter13 from './verilogChapters/chapter13.js';
import chapter14 from './verilogChapters/chapter14.js';
import chapter15 from './verilogChapters/chapter15.js';
import chapter16 from './verilogChapters/chapter16.js';

// Add completed status to chapters
const chapters = [
  { ...chapter1, completed: true },
  { ...chapter2, completed: false },
  { ...chapter3, completed: false },
  { ...chapter4, completed: false },
  { ...chapter5, completed: false },
  { ...chapter6, completed: false },
  { ...chapter7, completed: false },
  { ...chapter8, completed: false },
  { ...chapter9, completed: false },
  { ...chapter10, completed: false },
  { ...chapter11, completed: false },
  { ...chapter12, completed: false },
  { ...chapter13, completed: false },
  { ...chapter14, completed: false },
  { ...chapter15, completed: false },
  { ...chapter16, completed: false }
];

export const verilogFundamentals = {
  id: "verilog-fundamentals",
  title: "Verilog Fundamentals",
  description: "Master the basics of Verilog HDL and start your journey in digital design with industry-relevant skills and knowledge for FPGA/ASIC careers",
  image: "https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
  level: "Beginner",
  duration: "2 weeks",
  rating: 4.8,
  studentsCount: 22,
  completed: 1,
  totalChapters: 16,
  progress: 6.25, // 1/16 * 100
  updatedAt: "2025-04-05",
  topics: [
    "Verilog HDL Programming",
    "Digital Circuit Design",
    "RTL Coding",
    "Combinational Logic",
    "Sequential Logic",
    "FPGA Implementation"
  ],
  lessons: 16,
  exercises: 8,
  students: 8750,
  overview: "Welcome to the Verilog Fundamentals course! Verilog is one of the most widely used Hardware Description Languages (HDLs) in the industry for designing digital systems. This comprehensive course takes you from the very basics of Verilog to advanced topics, preparing you for real-world hardware design challenges and FPGA/ASIC industry positions. Whether you're interested in FPGA development, ASIC design, verification engineering, or hardware architecture roles, this course will provide you with the knowledge and practical skills you need to excel in technical interviews and on-the-job tasks. Through a combination of theoretical explanations, practical examples, and hands-on projects, you'll gain confidence in writing efficient and synthesizable Verilog code that meets industry standards and best practices.",
  
  careerResources: {
    jobProfiles: [
      {
        title: "FPGA Engineer",
        description: "Design and implement digital circuits on FPGAs using Verilog/VHDL",
        averageSalary: "$110,000 - $140,000",
        requiredSkills: ["Verilog/VHDL", "FPGA Implementation", "Timing Analysis", "High-Speed Design"],
        companies: ["Intel", "Xilinx/AMD", "Altera", "Microchip"]
      },
      {
        title: "ASIC Design Engineer",
        description: "Design application-specific integrated circuits for high-performance applications",
        averageSalary: "$120,000 - $160,000",
        requiredSkills: ["Verilog/VHDL", "Digital Design", "ASIC Flow", "Synthesis", "Low Power Design"],
        companies: ["NVIDIA", "Broadcom", "Qualcomm", "Apple"]
      },
      {
        title: "Verification Engineer",
        description: "Verify functionality of digital designs using simulation and formal methods",
        averageSalary: "$115,000 - $150,000",
        requiredSkills: ["Verilog", "SystemVerilog", "UVM", "Assertions", "Testbench Development"],
        companies: ["Intel", "Samsung", "Synopsys", "Cadence"]
      },
      {
        title: "Hardware Description Language (HDL) Programmer",
        description: "Develop and maintain Verilog/VHDL code for various digital systems",
        averageSalary: "$95,000 - $130,000",
        requiredSkills: ["Verilog", "VHDL", "Digital Logic", "Scripting"],
        companies: ["IBM", "Cisco", "Juniper Networks", "Lockheed Martin"]
      }
    ],
    interviewPrep: {
      technicalTopics: [
        "Digital Logic Fundamentals",
        "Verilog Syntax and Semantics",
        "Sequential vs. Combinational Logic",
        "Finite State Machines",
        "Timing Analysis",
        "Clock Domain Crossing",
        "Low Power Design Techniques",
        "FPGA Architecture",
        "Testbench Development"
      ],
      commonQuestions: [
        "Explain the differences between blocking and non-blocking assignments in Verilog.",
        "How would you implement a clock divider in Verilog?",
        "Describe the process of designing a finite state machine in Verilog.",
        "What are the key differences between simulation and synthesis?",
        "How would you handle metastability in your designs?",
        "What techniques can you use to optimize FPGA resource usage?",
        "How would you handle clock domain crossing in your designs?",
        "Explain how you would create a testbench for a sequential circuit."
      ],
      codeExercises: [
        "Implement a parameterized FIFO buffer with configurable depth and width",
        "Design a UART transmitter and receiver with configurable baud rate",
        "Create a memory controller that interfaces with external SRAM",
        "Implement a pipelined ALU with forwarding logic",
        "Design a synchronous AXI-Lite slave interface"
      ]
    },
    portfolioProjects: [
      {
        title: "Digital Clock with Multiple Time Zones",
        description: "Implement a digital clock with configurable time zones, alarm features, and display controller",
        complexity: "Medium",
        estimatedTime: "2-3 weeks",
        skillsGained: ["FSM Design", "Display Interfacing", "Real-time Clock Logic"]
      },
      {
        title: "RISC-V Processor Core",
        description: "Create a basic RISC-V processor core with pipelining and hazard detection",
        complexity: "High",
        estimatedTime: "4-8 weeks",
        skillsGained: ["Processor Architecture", "Pipelining", "Instruction Set Implementation"]
      },
      {
        title: "Audio Signal Processor",
        description: "Design an FPGA-based audio effects processor with filtering and modulation capabilities",
        complexity: "Medium-High",
        estimatedTime: "3-4 weeks",
        skillsGained: ["DSP Implementation", "Audio Processing", "I/O Interfacing"]
      }
    ],
    industryTrends: [
      {
        trend: "High-Level Synthesis (HLS)",
        description: "Designing hardware using C/C++ abstraction for faster development cycles",
        impact: "Reducing time-to-market and enabling software engineers to contribute to hardware design"
      },
      {
        trend: "Chiplet Architecture",
        description: "Modular chip design approach that integrates multiple dies in a package",
        impact: "Improved yield, reduced costs, and flexible design options"
      },
      {
        trend: "RISC-V Adoption",
        description: "Open standard instruction set architecture gaining popularity",
        impact: "Increased demand for RISC-V implementation skills in FPGA and ASIC design"
      },
      {
        trend: "AI Accelerator Design",
        description: "Specialized hardware for machine learning and AI applications",
        impact: "Growing market for hardware engineers skilled in designing efficient compute architectures"
      }
    ]
  },
  
  prerequisites: [
    "Basic understanding of digital logic (AND, OR, NOT gates)",
    "Familiarity with binary number system",
    "Basic programming knowledge in any language is helpful but not required"
  ],
  skills: [
    "Verilog HDL Programming",
    "Digital Circuit Design",
    "RTL Coding",
    "Combinational Logic",
    "Sequential Logic",
    "FSM Design",
    "Testbench Development",
    "Simulation Techniques",
    "FPGA Implementation",
    "Hardware Debugging",
    "Timing Analysis",
    "Clock Domain Crossing",
    "Low Power Design",
    "Design Verification",
    "ASIC Design Flow"
  ],
  chapters: chapters,
  exercises: [
    {
      id: "ex1",
      title: "Practical Example: Half Adder Implementation",
      description: "Implement a Half Adder circuit using Verilog dataflow modeling and verify its functionality.",
      difficulty: "Easy",
      type: "Practical Example",
      completed: false,
      code: `module half_adder(
  input wire a, b,
  output wire sum, carry
);
  // Sum is implemented using XOR gate
  assign sum = a ^ b;  
  
  // Carry is implemented using AND gate
  assign carry = a & b;
endmodule`,
      testbench: `module half_adder_tb;
  // Testbench signals
  reg a, b;
  wire sum, carry;
  
  // Instantiate the design under test
  half_adder dut(
    .a(a),
    .b(b),
    .sum(sum),
    .carry(carry)
  );
  
  // Test stimulus and monitoring
  initial begin
    // Setup monitoring
    $monitor("Time=%0t | a=%b, b=%b | sum=%b, carry=%b", $time, a, b, sum, carry);
    
    // Test all possible combinations
    a = 0; b = 0; #10;
    a = 0; b = 1; #10;
    a = 1; b = 0; #10;
    a = 1; b = 1; #10;
    
    // Finish simulation
    $display("Half adder test completed successfully!");
    $finish;
  end
  
  // Optional waveform generation
  initial begin
    $dumpfile("half_adder_tb.vcd");
    $dumpvars(0, half_adder_tb);
  end
endmodule`
    },
    {
      id: "ex2",
      title: "Practical Example: 4-Bit Counter Design",
      description: "Design a 4-bit synchronous up-counter with active-low reset using behavioral modeling.",
      difficulty: "Medium",
      type: "Practical Example",
      completed: false,
      code: `module counter_4bit(
  input wire clk,          // Clock input
  input wire rst_n,        // Active-low asynchronous reset
  input wire enable,       // Counter enable signal
  output reg [3:0] count,  // 4-bit counter output
  output wire count_max    // High when counter reaches maximum value (15)
);
  // Maximum count detection
  assign count_max = (count == 4'b1111) ? 1'b1 : 1'b0;
  
  // Counter logic
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      // Reset counter to zero when reset is asserted (active low)
      count <= 4'b0000;
    end
    else if (enable) begin
      // Increment counter when enabled
      count <= count + 1'b1;
    end
  end
endmodule`,
      testbench: `module counter_4bit_tb;
  // Testbench signals
  reg clk, rst_n, enable;
  wire [3:0] count;
  wire count_max;
  integer i;
  
  // Instantiate the design under test
  counter_4bit dut(
    .clk(clk),
    .rst_n(rst_n),
    .enable(enable),
    .count(count),
    .count_max(count_max)
  );
  
  // Clock generation (10ns period, 100MHz)
  always #5 clk = ~clk;
  
  // Test sequence
  initial begin
    // Initialize signals
    clk = 0;
    rst_n = 0;
    enable = 0;
    
    // Apply reset for 20ns
    #20;
    rst_n = 1;
    
    // Test counter with enable active
    enable = 1;
    
    // Let it count for 20 cycles (should wrap around)
    for(i = 0; i < 20; i = i + 1) begin
      @(posedge clk);
      $display("Time=%0t, count=%b, count_max=%b", $time, count, count_max);
    end
    
    // Disable counter and see if it holds value
    enable = 0;
    @(posedge clk);
    $display("Counter disabled at: %b", count);
    
    // Continue for a few more cycles to verify
    for(i = 0; i < 5; i = i + 1) begin
      @(posedge clk);
      $display("Time=%0t, count=%b (should be stable)", $time, count);
    end
    
    $display("Counter test completed successfully!");
    $finish;
  end
  
  // Optional waveform generation
  initial begin
    $dumpfile("counter_tb.vcd");
    $dumpvars(0, counter_4bit_tb);
  end
endmodule`
    },
    {
      id: "ex3",
      title: "Practical Example: FIFO Design",
      description: "Implement a parameterized FIFO (First-In, First-Out) buffer using Verilog, with configurable width and depth.",
      difficulty: "Medium",
      type: "Practical Example",
      completed: false,
      code: `module fifo #(
  parameter DATA_WIDTH = 8,
  parameter FIFO_DEPTH = 16
)(
  input wire clk,
  input wire rst_n,
  input wire wr_en,
  input wire rd_en,
  input wire [DATA_WIDTH-1:0] data_in,
  output reg [DATA_WIDTH-1:0] data_out,
  output wire full,
  output wire empty,
  output wire [$clog2(FIFO_DEPTH):0] fill_level
);
  // Memory array for FIFO storage
  reg [DATA_WIDTH-1:0] mem [0:FIFO_DEPTH-1];
  
  // Pointers for read and write operations
  reg [$clog2(FIFO_DEPTH)-1:0] wr_ptr;
  reg [$clog2(FIFO_DEPTH)-1:0] rd_ptr;
  
  // Counter for tracking fill level
  reg [$clog2(FIFO_DEPTH):0] count;
  
  // FIFO status signals
  assign empty = (count == 0);
  assign full = (count == FIFO_DEPTH);
  assign fill_level = count;
  
  // Write operation
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      wr_ptr <= 0;
    end
    else if (wr_en && !full) begin
      mem[wr_ptr] <= data_in;
      wr_ptr <= (wr_ptr == FIFO_DEPTH-1) ? 0 : wr_ptr + 1;
    end
  end
  
  // Read operation
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      rd_ptr <= 0;
      data_out <= 0;
    end
    else if (rd_en && !empty) begin
      data_out <= mem[rd_ptr];
      rd_ptr <= (rd_ptr == FIFO_DEPTH-1) ? 0 : rd_ptr + 1;
    end
  end
  
  // Counter for fill level
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      count <= 0;
    end
    else begin
      case ({wr_en & ~full, rd_en & ~empty})
        2'b10: count <= count + 1; // Write only
        2'b01: count <= count - 1; // Read only
        2'b11: count <= count;     // Both read and write
        default: count <= count;   // No operation
      endcase
    end
  end
endmodule`,
      testbench: `module fifo_tb;
  // Parameters
  parameter DATA_WIDTH = 8;
  parameter FIFO_DEPTH = 16;
  
  // Testbench signals
  reg clk;
  reg rst_n;
  reg wr_en;
  reg rd_en;
  reg [DATA_WIDTH-1:0] data_in;
  wire [DATA_WIDTH-1:0] data_out;
  wire full;
  wire empty;
  wire [$clog2(FIFO_DEPTH):0] fill_level;
  
  // Test data
  reg [DATA_WIDTH-1:0] test_data [0:31];
  integer i;
  
  // Instantiate the FIFO
  fifo #(
    .DATA_WIDTH(DATA_WIDTH),
    .FIFO_DEPTH(FIFO_DEPTH)
  ) dut (
    .clk(clk),
    .rst_n(rst_n),
    .wr_en(wr_en),
    .rd_en(rd_en),
    .data_in(data_in),
    .data_out(data_out),
    .full(full),
    .empty(empty),
    .fill_level(fill_level)
  );
  
  // Clock generation
  always #5 clk = ~clk;
  
  // Test sequence
  initial begin
    // Initialize signals
    clk = 0;
    rst_n = 0;
    wr_en = 0;
    rd_en = 0;
    data_in = 0;
    
    // Generate test data
    for (i = 0; i < 32; i = i + 1) begin
      test_data[i] = i;
    end
    
    // Apply reset
    #20 rst_n = 1;
    
    // Fill the FIFO
    wr_en = 1;
    rd_en = 0;
    for (i = 0; i < FIFO_DEPTH; i = i + 1) begin
      data_in = test_data[i];
      @(posedge clk);
      $display("Write %d, fill_level = %d", data_in, fill_level);
    end
    
    // Check full condition
    if (full) $display("FIFO full detected correctly");
    else $display("ERROR: FIFO should be full!");
    
    // Read from FIFO
    wr_en = 0;
    rd_en = 1;
    for (i = 0; i < FIFO_DEPTH; i = i + 1) begin
      @(posedge clk);
      $display("Read %d, fill_level = %d", data_out, fill_level);
    end
    
    // Simultaneous read and write operations
    wr_en = 1;
    rd_en = 1;
    for (i = 16; i < 24; i = i + 1) begin
      data_in = test_data[i];
      @(posedge clk);
      $display("Read %d, Write %d, fill_level = %d", data_out, data_in, fill_level);
    end
    
    wr_en = 0;
    rd_en = 0;
    
    $display("FIFO test completed successfully!");
    $finish;
  end
  
  // Generate waveform file
  initial begin
    $dumpfile("fifo_tb.vcd");
    $dumpvars(0, fifo_tb);
  end
endmodule`
    },
    {
      id: "ex4",
      title: "Practical Example: UART Transmitter",
      description: "Design a UART (Universal Asynchronous Receiver/Transmitter) transmitter module that converts parallel data into serial format.",
      difficulty: "Hard",
      type: "Practical Example",
      completed: false,
      code: `module uart_tx #(
  parameter CLK_FREQ = 50000000,  // Default 50MHz clock
  parameter BAUD_RATE = 115200,   // Default 115200 baud rate
  parameter DATA_BITS = 8,        // Default 8 data bits
  parameter PARITY_EN = 0,        // 0 = no parity, 1 = parity enabled
  parameter PARITY_TYPE = 0       // 0 = even, 1 = odd
)(
  input wire clk,                  // System clock
  input wire rst_n,                // Active-low reset
  input wire tx_start,             // Start transmission
  input wire [DATA_BITS-1:0] tx_data, // Data to transmit
  output reg tx,                   // Serial output
  output wire tx_busy              // Transmitter busy flag
);
  // Calculate clock cycles per bit
  localparam CYCLES_PER_BIT = CLK_FREQ / BAUD_RATE;
  
  // State machine states
  localparam IDLE = 3'd0;
  localparam START_BIT = 3'd1;
  localparam DATA_BITS_STATE = 3'd2;
  localparam PARITY_BIT = 3'd3;
  localparam STOP_BIT = 3'd4;
  
  // State and counter registers
  reg [2:0] state;
  reg [15:0] cycle_counter;
  reg [2:0] bit_counter;
  reg parity;
  
  // TX busy signal
  assign tx_busy = (state != IDLE);
  
  // State machine
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      state <= IDLE;
      cycle_counter <= 0;
      bit_counter <= 0;
      parity <= 0;
      tx <= 1'b1;  // Idle state is high
    end
    else begin
      case (state)
        IDLE: begin
          tx <= 1'b1;  // Idle state is high
          cycle_counter <= 0;
          bit_counter <= 0;
          
          // Calculate parity bit
          if (PARITY_EN) begin
            parity <= PARITY_TYPE;
            for (int i = 0; i < DATA_BITS; i = i + 1) begin
              parity <= parity ^ tx_data[i];
            end
          end
          
          // Start transmission when requested
          if (tx_start) begin
            state <= START_BIT;
          end
        end
        
        START_BIT: begin
          tx <= 1'b0;  // Start bit is low
          
          // Move to data bits state after one bit time
          if (cycle_counter < CYCLES_PER_BIT - 1) begin
            cycle_counter <= cycle_counter + 1;
          end
          else begin
            cycle_counter <= 0;
            state <= DATA_BITS_STATE;
          end
        end
        
        DATA_BITS_STATE: begin
          tx <= tx_data[bit_counter];  // Send current bit
          
          // Count cycles for bit timing
          if (cycle_counter < CYCLES_PER_BIT - 1) begin
            cycle_counter <= cycle_counter + 1;
          end
          else begin
            cycle_counter <= 0;
            
            // Move to next bit or next state
            if (bit_counter < DATA_BITS - 1) begin
              bit_counter <= bit_counter + 1;
            end
            else begin
              bit_counter <= 0;
              state <= PARITY_EN ? PARITY_BIT : STOP_BIT;
            end
          end
        end
        
        PARITY_BIT: begin
          tx <= parity;  // Send parity bit
          
          // Move to stop bit after one bit time
          if (cycle_counter < CYCLES_PER_BIT - 1) begin
            cycle_counter <= cycle_counter + 1;
          end
          else begin
            cycle_counter <= 0;
            state <= STOP_BIT;
          end
        end
        
        STOP_BIT: begin
          tx <= 1'b1;  // Stop bit is high
          
          // Return to idle after one bit time
          if (cycle_counter < CYCLES_PER_BIT - 1) begin
            cycle_counter <= cycle_counter + 1;
          end
          else begin
            cycle_counter <= 0;
            state <= IDLE;
          end
        end
        
        default: state <= IDLE;
      endcase
    end
  end
endmodule`,
      testbench: `module uart_tx_tb;
  // Parameters
  parameter CLK_FREQ = 50000000;
  parameter BAUD_RATE = 115200;
  parameter DATA_BITS = 8;
  parameter CYCLES_PER_BIT = CLK_FREQ / BAUD_RATE;
  
  // Testbench signals
  reg clk;
  reg rst_n;
  reg tx_start;
  reg [DATA_BITS-1:0] tx_data;
  wire tx;
  wire tx_busy;
  
  // For cycle counting and bit verification
  integer cycle_count;
  integer i, j;
  reg [9:0] received_frame; // start bit + 8 data bits + stop bit
  
  // Instantiate the UART transmitter
  uart_tx #(
    .CLK_FREQ(CLK_FREQ),
    .BAUD_RATE(BAUD_RATE),
    .DATA_BITS(DATA_BITS),
    .PARITY_EN(0),
    .PARITY_TYPE(0)
  ) dut (
    .clk(clk),
    .rst_n(rst_n),
    .tx_start(tx_start),
    .tx_data(tx_data),
    .tx(tx),
    .tx_busy(tx_busy)
  );
  
  // Clock generation
  always #10 clk = ~clk; // 50MHz clock
  
  // Test sequence
  initial begin
    // Initialize signals
    clk = 0;
    rst_n = 0;
    tx_start = 0;
    tx_data = 0;
    cycle_count = 0;
    
    // Apply reset
    #20 rst_n = 1;
    #20;
    
    // Test with a few different data values
    transmit_and_verify(8'h55); // Alternating 0s and 1s
    transmit_and_verify(8'hAA); // Alternating 1s and 0s
    transmit_and_verify(8'h00); // All zeros
    transmit_and_verify(8'hFF); // All ones
    transmit_and_verify(8'h96); // Random data
    
    // Test complete
    #1000;
    $display("UART TX test completed successfully!");
    $finish;
  end
  
  // Task to transmit a byte and verify the serial output
  task transmit_and_verify(input [7:0] data);
    begin
      // Initiate transmission
      @(posedge clk);
      tx_data = data;
      tx_start = 1;
      @(posedge clk);
      tx_start = 0;
      
      $display("Transmitting 0x%h", data);
      
      // Wait for transmission to start
      wait(tx_busy);
      
      // Sample the start bit
      received_frame[0] = tx;
      
      // Sample each data bit at the center of the bit time
      for (i = 0; i < 8; i = i + 1) begin
        // Wait until the middle of the bit time
        for (j = 0; j < CYCLES_PER_BIT/2; j = j + 1) begin
          @(posedge clk);
        end
        
        // Sample the bit
        received_frame[i+1] = tx;
        
        // Wait for the rest of the bit time
        for (j = 0; j < CYCLES_PER_BIT/2; j = j + 1) begin
          @(posedge clk);
        end
      end
      
      // Sample the stop bit
      received_frame[9] = tx;
      
      // Verify start and stop bits
      if (received_frame[0] != 0) $display("ERROR: Start bit not detected!");
      if (received_frame[9] != 1) $display("ERROR: Stop bit not detected!");
      
      // Verify data bits
      for (i = 0; i < 8; i = i + 1) begin
        if (received_frame[i+1] != data[i]) begin
          $display("ERROR: Data bit %0d mismatch! Expected %b, Got %b", 
                   i, data[i], received_frame[i+1]);
        end
      end
      
      $display("Received frame: %b (expected: 0_%b_1)", received_frame, data);
      
      // Wait for transmission to complete
      wait(!tx_busy);
      #1000; // Wait a bit between transmissions
    end
  endtask
  
  // Generate waveform file
  initial begin
    $dumpfile("uart_tx_tb.vcd");
    $dumpvars(0, uart_tx_tb);
  end
endmodule`
    },
    {
      id: "ex5",
      title: "Practical Example: Digital Signal Processing System",
      description: "Design a complete digital signal processing system that includes an input capture module, FIR filter for signal processing, and output interface with appropriate control logic.",
      difficulty: "Expert",
      type: "Practical Example",
      details: `This practical example integrates concepts from throughout the course:
- Design requirements analysis and specification development
- RTL implementation of data path and control logic
- Parameterized module design for flexibility
- Testbench development with automated validation
- Timing and resource optimization
- System integration with multiple components

**Requirements:**
1. Input interface with valid/ready handshaking protocol
2. Configurable FIR filter with at least 8 programmable coefficients
3. Control module for coefficient loading and operational modes
4. Output interface with processed data and status flags
5. Comprehensive testbench that validates functionality with various input patterns
6. Documentation including block diagram, interface specification, and test results`,
      completed: false,
      code: `//-------------------------------------------
// Input Capture Module
//-------------------------------------------
module input_capture #(
  parameter DATA_WIDTH = 16
)(
  input  wire clk,
  input  wire rst_n,
  // External interface
  input  wire [DATA_WIDTH-1:0] data_in,
  input  wire data_valid,
  output wire data_ready,
  // Internal interface
  output reg  [DATA_WIDTH-1:0] captured_data,
  output reg  captured_valid,
  input  wire captured_ready
);
  // Ready when downstream is ready to accept data
  assign data_ready = captured_ready || !captured_valid;
  
  // Capture and hold input data
  always @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      captured_data <= {DATA_WIDTH{1'b0}};
      captured_valid <= 1'b0;
    end 
    else if (data_valid && data_ready) begin
      // Capture new data
      captured_data <= data_in;
      captured_valid <= 1'b1;
    end 
    else if (captured_ready) begin
      // Clear valid flag when data is consumed
      captured_valid <= 1'b0;
    end
  end
endmodule`,
      testbench: `module dsp_system_tb;
  // Parameters
  parameter DATA_WIDTH = 16;
  parameter NUM_TAPS = 8;
  
  // Testbench signals
  reg clk;
  reg rst_n;
  
  // Input interface
  reg [DATA_WIDTH-1:0] data_in;
  reg data_valid;
  wire data_ready;
  
  // Output interface
  wire [DATA_WIDTH-1:0] data_out;
  wire data_out_valid;
  reg data_out_ready;
  
  // Test data and storage
  reg [DATA_WIDTH-1:0] test_data [0:99];
  reg [DATA_WIDTH-1:0] output_data [0:99];
  integer i;
  
  // Instantiate the DSP system
  dsp_system #(
    .DATA_WIDTH(DATA_WIDTH),
    .NUM_TAPS(NUM_TAPS)
  ) dut (
    .clk(clk),
    .rst_n(rst_n),
    .data_in(data_in),
    .data_valid(data_valid),
    .data_ready(data_ready),
    .data_out(data_out),
    .data_out_valid(data_out_valid),
    .data_out_ready(data_out_ready)
  );
  
  // Clock generation
  always #5 clk = ~clk;
  
  // Test sequence
  initial begin
    // Initialize signals
    clk = 0;
    rst_n = 0;
    data_in = 0;
    data_valid = 0;
    data_out_ready = 1;
    
    // Generate test data (e.g., step function)
    for (i = 0; i < 50; i = i + 1) begin
      test_data[i] = 0;
    end
    for (i = 50; i < 100; i = i + 1) begin
      test_data[i] = 16'h0800;
    end
    
    // Apply reset
    #20 rst_n = 1;
    #20;
    
    // Send test data to the DSP system
    for (i = 0; i < 100; i = i + 1) begin
      @(posedge clk);
      data_in = test_data[i];
      data_valid = 1;
      
      // Wait for ready
      while (!data_ready) @(posedge clk);
    end
    
    data_valid = 0;
    
    // Wait for processing to complete
    #1000;
    
    // Test complete
    $display("DSP system test completed!");
    $finish;
  end
  
  // Capture output data
  integer output_count = 0;
  always @(posedge clk) begin
    if (data_out_valid && data_out_ready) begin
      output_data[output_count] = data_out;
      $display("Output %0d: %h", output_count, data_out);
      output_count = output_count + 1;
    end
  end
  
  // Generate waveform file
  initial begin
    $dumpfile("dsp_system_tb.vcd");
    $dumpvars(0, dsp_system_tb);
  end
endmodule`
    }
  ],
  syllabus: [
    {
      title: "Introduction to Verilog and HDLs",
      description: "Learn the fundamentals of hardware description languages, their role in modern digital design, and how they're used in industry workflows"
    },
    {
      title: "Verilog Syntax and Basic Modeling",
      description: "Master the core syntax and modeling approaches with industry-standard coding practices"
    },
    {
      title: "Combinational Circuit Design",
      description: "Design and implement combinational logic in Verilog for real-world applications"
    },
    {
      title: "Sequential Circuit Design",
      description: "Create sequential circuits with flip-flops and registers following best practices from industry"
    },
    {
      title: "Modular Design and Hierarchy",
      description: "Structure complex designs using hierarchy and reusable modules as done in commercial projects"
    },
    {
      title: "Behavioral Modeling",
      description: "Express algorithms and complex behavior using procedural constructs for efficient design"
    },
    {
      title: "Testbench Development",
      description: "Create comprehensive testbenches to verify designs using industry verification methodologies"
    },
    {
      title: "Advanced Verilog Features",
      description: "Explore advanced language features and design techniques used in professional environments"
    },
    {
      title: "Synthesis and Implementation",
      description: "Prepare designs for synthesis and actual hardware implementation following industry flows"
    },
    {
      title: "Timing Analysis and Constraints",
      description: "Learn how to analyze timing and create proper constraints for reliable designs"
    },
    {
      title: "Design for Testability",
      description: "Implement DFT techniques to ensure your designs can be properly tested in production"
    },
    {
      title: "Advanced Verilog Constructs",
      description: "Master advanced language features that enable more efficient and maintainable code"
    },
    {
      title: "Clock Domain Crossing",
      description: "Handle signals crossing between different clock domains safely and reliably"
    },
    {
      title: "Low Power Design Techniques",
      description: "Implement strategies for reducing power consumption in your designs"
    },
    {
      title: "FPGA Implementation Flow",
      description: "Navigate the complete FPGA implementation process from RTL to bitstream"
    },
    {
      title: "Industry Project Implementation",
      description: "Apply all concepts in a comprehensive project following industry practices"
    }
  ],
  codeExamples: [
    {
      title: "Simple AND Gate",
      code: "module and_gate(\n  input a, b,\n  output y\n);\n  assign y = a & b;\nendmodule"
    },
    {
      title: "D Flip-Flop",
      code: "module d_ff(\n  input clk, reset, d,\n  output reg q\n);\n\n  always @(posedge clk or posedge reset)\n    if (reset)\n      q <= 1'b0;\n    else\n      q <= d;\nendmodule"
    },
    {
      title: "4-Bit Binary Counter",
      code: "module counter_4bit(\n  input clk, reset, enable,\n  output reg [3:0] count\n);\n\n  always @(posedge clk or posedge reset)\n    if (reset)\n      count <= 4'b0000;\n    else if (enable)\n      count <= count + 1'b1;\nendmodule"
    },
    {
      title: "8:1 Multiplexer",
      code: "module mux_8to1(\n  input [2:0] sel,\n  input [7:0] data,\n  output reg out\n);\n\n  always @(*)\n    out = data[sel];\nendmodule"
    },
    {
      title: "Basic UART Transmitter",
      code: "module uart_tx(\n  input clk, reset,\n  input [7:0] data,\n  input data_valid,\n  output reg tx,\n  output reg busy\n);\n\n  // State definitions\n  localparam IDLE = 2'b00;\n  localparam START = 2'b01;\n  localparam DATA = 2'b10;\n  localparam STOP = 2'b11;\n\n  reg [1:0] state;\n  reg [2:0] bit_index;\n  reg [7:0] data_reg;\n\n  always @(posedge clk or posedge reset) begin\n    if (reset) begin\n      state <= IDLE;\n      tx <= 1'b1; // Idle high\n      busy <= 1'b0;\n    end else begin\n      case (state)\n        IDLE: if (data_valid) begin\n          data_reg <= data;\n          state <= START;\n          busy <= 1'b1;\n        end\n        START: begin\n          tx <= 1'b0; // Start bit\n          bit_index <= 3'b000;\n          state <= DATA;\n        end\n        DATA: begin\n          tx <= data_reg[bit_index];\n          if (bit_index == 3'b111)\n            state <= STOP;\n          else\n            bit_index <= bit_index + 1'b1;\n        end\n        STOP: begin\n          tx <= 1'b1; // Stop bit\n          state <= IDLE;\n          busy <= 1'b0;\n        end\n      endcase\n    end\n  end\nendmodule"
    }
  ],
  resources: [
    {
      title: "Verilog Language Reference",
      type: "PDF",
      url: "https://people.cs.georgetown.edu/~squier/Teaching/HardwareFundamentals/LC3-trunk/docs/verilog/VerilogLangRef.pdf"
    },
    {
      title: "Digital Design with Verilog Cheatsheet",
      type: "PDF",
      url: "https://www.slideshare.net/slideshow/verilog-cheat-sheet2-1pdf/265273788"
    },
    {
      title: "Common Verilog Interview Questions and Answers",
      type: "Website",
      url: "https://intellipaat.com/blog/interview-question/verilog-interview-questions/"
    },
    {
      title: "FPGA Career Path Guide",
      type: "Website",
      url: "https://vlsiweb.com/fpga-engineer/"
    },
    {
      title: "Hardware Design Best Practices",
      type: "Link",
      url: "https://kemsys.com/blog/hardware-design-best-practices/"
    },
    {
      title: "Synopsys Synthesis Quick Reference",
      type: "PDF",
      url: "https://www.academia.edu/34197207/Synthesis_Quick_Reference"
    }
  ],
  relatedModules: [
    {
      id: "system-verilog",
      title: "SystemVerilog for Verification",
      description: "Learn advanced verification techniques using SystemVerilog that are in high demand across the semiconductor industry.",
      level: "Intermediate"
    },
    {
      id: "fpga-design",
      title: "FPGA Implementation with Verilog",
      description: "Take your Verilog designs to actual FPGA hardware with industry-standard tools and methodologies.",
      level: "Intermediate"
    },
    {
      id: "riscv-processor",
      title: "RISC-V Processor Design",
      description: "Learn how to design a RISC-V processor using Verilog HDL, a highly sought-after skill in the industry.",
      level: "Advanced"
    },
    {
      id: "soc-design",
      title: "System-on-Chip Design",
      description: "Master the art of creating complex Systems-on-Chip with multiple components and interfaces.",
      level: "Advanced"
    },
    {
      id: "hardware-verification",
      title: "Hardware Verification Techniques",
      description: "Build expertise in modern hardware verification methodologies that will make you highly employable.",
      level: "Intermediate"
    }
  ],
  bookmarked: false,
  
  // Industry connections section
  industryConnections: {
    title: "Industry Connections & Job Opportunities",
    description: "Building skills in Verilog opens doors to a wide range of career opportunities in semiconductor, electronics, and hardware companies worldwide.",
    jobMarketInsights: [
      {
        region: "United States",
        demandLevel: "Very High",
        averageSalary: "$120,000 - $180,000",
        growthRate: "+15% annually"
      },
      {
        region: "Europe",
        demandLevel: "High",
        averageSalary: "€70,000 - €115,000",
        growthRate: "+12% annually"
      },
      {
        region: "Asia",
        demandLevel: "Very High",
        averageSalary: "$80,000 - $150,000",
        growthRate: "+18% annually"
      }
    ],
    topEmployers: [
      "Intel", "AMD", "Nvidia", "Qualcomm", "Apple", "Google", "Microsoft", 
      "Samsung", "Broadcom", "Xilinx", "Altera", "Lattice Semiconductor"
    ],
    careerEvents: [
      {
        name: "DAC (Design Automation Conference)",
        description: "Premier conference for design and automation of electronic systems",
        relevance: "Critical for networking with industry leaders"
      },
      {
        name: "FPGA Conference",
        description: "Focused on FPGA technology and applications",
        relevance: "Great for job opportunities in FPGA design"
      },
      {
        name: "ISSCC (International Solid-State Circuits Conference)",
        description: "Flagship conference of the Solid-State Circuits Society",
        relevance: "Important for ASIC and chip design careers"
      }
    ]
  }
};