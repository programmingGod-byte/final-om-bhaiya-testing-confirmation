const chapter13 = {
  id: 13,
  title: "FPGA Implementation",
  description: "Implementing RISC-V processors on FPGA platforms",
  estimatedTime: "4 hours",
  completed: false,
  sections: [
    {
      id: "13.1",
      title: "FPGA Design Flow",
      content: `
        <h3>FPGA Implementation Workflow for RISC-V Processors</h3>
        <p>Field-Programmable Gate Arrays (FPGAs) offer an ideal platform for prototyping and deploying RISC-V processors, providing a balance of flexibility, performance, and time-to-market advantages.</p>
        
        <h4>RTL Synthesis for FPGA Targets</h4>
        <p>The synthesis process for FPGA targets involves transforming your Verilog/VHDL RISC-V design into the FPGA's configurable logic blocks:</p>
        <ul>
          <li><strong>Tool Chains</strong>: Major FPGA vendors provide their own synthesis tools (Vivado for Xilinx/AMD, Quartus for Intel, Libero for Microchip)</li>
          <li><strong>Optimization Goals</strong>: Synthesis can be configured to prioritize area, speed, or power consumption</li>
          <li><strong>Technology Mapping</strong>: The process of mapping generic RTL constructs to FPGA-specific resources (LUTs, FFs, DSPs, BRAMs)</li>
          <li><strong>Platform-Specific Considerations</strong>: Different FPGA families have different architectures and resources that influence synthesis decisions</li>
        </ul>
        
        <h4>Constraint Management</h4>
        <p>Constraints guide the tools to achieve your design requirements:</p>
        <ul>
          <li><strong>Timing Constraints</strong>: Specify clock frequencies, setup/hold requirements, and timing relationships</li>
          <li><strong>Physical Constraints</strong>: Define pin assignments, placement regions, and I/O standards</li>
          <li><strong>Resource Constraints</strong>: Control resource utilization and allocation</li>
          <li><strong>Cross-Clock Domain</strong>: Specify relationships between different clock domains</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/hVzRGnx.png" alt="FPGA Design Flow" style="max-width: 700px; width: 100%;">
          <p><em>Comprehensive FPGA design flow for RISC-V implementations</em></p>
        </div>
        
        <h4>Place and Route Optimization</h4>
        <p>After synthesis, the place and route process determines the physical implementation:</p>
        <ul>
          <li><strong>Placement</strong>: Assigns synthesized components to specific physical locations on the FPGA</li>
          <li><strong>Routing</strong>: Creates connections between components using the FPGA's routing resources</li>
          <li><strong>Iterative Refinement</strong>: Tools perform multiple passes to optimize the implementation</li>
          <li><strong>Congestion Management</strong>: Detecting and resolving routing congestion</li>
        </ul>
        
        <h4>Timing Closure Techniques</h4>
        <p>Achieving timing closure is often the most challenging aspect of FPGA implementation:</p>
        <ul>
          <li><strong>Critical Path Analysis</strong>: Identifying and optimizing the longest timing paths</li>
          <li><strong>Pipelining</strong>: Adding pipeline stages to break long combinational paths</li>
          <li><strong>Retiming</strong>: Repositioning registers to balance combinational logic between clock cycles</li>
          <li><strong>Clock Domain Management</strong>: Proper handling of clock domain crossings</li>
          <li><strong>False Path Identification</strong>: Marking paths that are not relevant for timing analysis</li>
        </ul>
        
        <h4>Resource Utilization Analysis</h4>
        <p>Understanding and optimizing resource usage is essential for efficient designs:</p>
        <ul>
          <li><strong>Resource Reports</strong>: Analyzing LUT, FF, BRAM, DSP utilization</li>
          <li><strong>Bottleneck Identification</strong>: Determining which resources limit your design</li>
          <li><strong>Architectural Tradeoffs</strong>: Exploring alternative implementations for resource-intensive modules</li>
          <li><strong>Utilization Maps</strong>: Visualizing resource distribution across the FPGA</li>
        </ul>
      `
    },
    {
      id: "13.2",
      title: "FPGA-specific Optimizations",
      content: `
        <h3>Specialized Techniques for RISC-V on FPGAs</h3>
        <p>FPGA architectures offer unique resources that can be leveraged to optimize RISC-V implementations.</p>
        
        <h4>BRAM Utilization for Memory</h4>
        <p>Block RAMs are dedicated memory resources that should be efficiently used:</p>
        <ul>
          <li><strong>Register File Implementation</strong>: Using dual-port BRAMs for the RISC-V register file</li>
          <li><strong>Instruction Cache</strong>: Implementing instruction memories with appropriate BRAM configurations</li>
          <li><strong>Data Cache</strong>: Optimizing data cache structures for BRAM architecture</li>
          <li><strong>Memory Controller</strong>: Efficient BRAM usage for memory controller buffers</li>
          <li><strong>BRAM Inference</strong>: Writing RTL that efficiently infers BRAM resources</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/XhPZS4W.png" alt="FPGA Resource Optimization" style="max-width: 700px; width: 100%;">
          <p><em>FPGA resource optimization techniques for RISC-V implementations</em></p>
        </div>
        
        <h4>DSP Block Usage for Arithmetic</h4>
        <p>DSP blocks accelerate arithmetic operations within the RISC-V processor:</p>
        <ul>
          <li><strong>ALU Implementation</strong>: Mapping arithmetic operations to DSP resources</li>
          <li><strong>Multiplier Units</strong>: Efficiently using DSP blocks for the M-extension</li>
          <li><strong>Floating-Point Units</strong>: Leveraging DSPs for F/D-extensions</li>
          <li><strong>Address Calculation</strong>: Using DSPs for fast address generation</li>
          <li><strong>DSP Inference</strong>: RTL coding styles that ensure proper DSP utilization</li>
        </ul>
        
        <h4>Clock Management</h4>
        <p>Effective clock strategies are essential for high-performance designs:</p>
        <ul>
          <li><strong>Clock Generation</strong>: Using MMCM/PLL resources for clock synthesis</li>
          <li><strong>Clock Distribution</strong>: Leveraging dedicated clock networks</li>
          <li><strong>Clock Domain Crossing</strong>: Techniques for reliable CDC in FPGAs</li>
          <li><strong>Clock Gating</strong>: FPGA-friendly approaches to clock gating for power reduction</li>
          <li><strong>Dynamic Frequency Scaling</strong>: Runtime clock frequency adjustment</li>
        </ul>
        
        <h4>I/O Planning</h4>
        <p>Carefully designed I/O interfaces enhance system integration:</p>
        <ul>
          <li><strong>Pin Assignment</strong>: Strategic allocation of FPGA pins for peripherals</li>
          <li><strong>I/O Standards</strong>: Selecting appropriate electrical standards</li>
          <li><strong>High-Speed Interfaces</strong>: Implementing SERDES for fast communication</li>
          <li><strong>Input Synchronization</strong>: Proper synchronization of asynchronous inputs</li>
          <li><strong>Output Buffering</strong>: Ensuring clean output signals</li>
        </ul>
        
        <h4>Debug Insertion (ILA, VIO)</h4>
        <p>FPGA-based debugging infrastructure facilitates RISC-V processor verification:</p>
        <ul>
          <li><strong>Integrated Logic Analyzer (ILA)</strong>: Capturing internal signals for analysis</li>
          <li><strong>Virtual I/O (VIO)</strong>: Interactive control of design parameters at runtime</li>
          <li><strong>Debug Hub</strong>: Centralized management of debug cores</li>
          <li><strong>Trace Buffers</strong>: Recording processor execution history</li>
          <li><strong>Trigger Conditions</strong>: Configuring sophisticated capture conditions</li>
        </ul>
      `
    },
    {
      id: "13.3",
      title: "SoC FPGA Integration",
      content: `
        <h3>Building Complete RISC-V Systems on FPGA</h3>
        <p>Modern FPGA platforms enable the integration of RISC-V processors with peripherals and accelerators to form complete systems-on-chip.</p>
        
        <h4>Soft vs. Hard Processor Cores</h4>
        <p>Understanding the tradeoffs between soft RISC-V cores and hard ARM/RISC-V cores in SoC FPGAs:</p>
        <ul>
          <li><strong>Soft Cores</strong>: Implemented in FPGA fabric, offering maximum flexibility but lower performance</li>
          <li><strong>Hard Cores</strong>: Dedicated silicon with higher performance, lower power, but fixed functionality</li>
          <li><strong>Hybrid Approaches</strong>: Using hard cores for main processing and soft cores for specialized tasks</li>
          <li><strong>Customization Tradeoffs</strong>: Hard cores offer less customization but better performance</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/dNVk2pB.png" alt="RISC-V SoC FPGA" style="max-width: 700px; width: 100%;">
          <p><em>RISC-V SoC architecture with integrated peripherals and accelerators</em></p>
        </div>
        
        <h4>Memory Controller Integration</h4>
        <p>Connecting RISC-V processors to on-chip and off-chip memory:</p>
        <ul>
          <li><strong>DRAM Controllers</strong>: Implementing DDR3/4/5 memory interfaces</li>
          <li><strong>On-Chip Memory</strong>: Efficient utilization of BRAM resources</li>
          <li><strong>Cache Controllers</strong>: Optimized cache implementations for FPGA</li>
          <li><strong>Memory Hierarchy</strong>: Balancing latency, throughput, and resource usage</li>
          <li><strong>Hard Memory Controllers</strong>: Leveraging built-in memory interfaces in SoC FPGAs</li>
        </ul>
        
        <h4>Peripherals Implementation</h4>
        <p>Adding essential peripherals to complete the RISC-V system:</p>
        <ul>
          <li><strong>UART, SPI, I2C</strong>: Standard communication interfaces</li>
          <li><strong>GPIO</strong>: General-purpose I/O for external connections</li>
          <li><strong>Timers and Counters</strong>: Essential timing resources</li>
          <li><strong>Interrupt Controllers</strong>: PLIC/CLIC implementations</li>
          <li><strong>DMA Controllers</strong>: Efficient data transfer without CPU involvement</li>
          <li><strong>Ethernet MAC</strong>: Network connectivity</li>
        </ul>
        
        <h4>Bus Infrastructure</h4>
        <p>Interconnect architectures for RISC-V SoCs on FPGA:</p>
        <ul>
          <li><strong>AXI4/AXI4-Lite</strong>: Industry-standard high-performance bus</li>
          <li><strong>TileLink</strong>: RISC-V native interconnect protocol</li>
          <li><strong>Wishbone</strong>: Simpler open-source interconnect</li>
          <li><strong>Crossbar vs. Bus Matrix</strong>: Connectivity topologies and tradeoffs</li>
          <li><strong>Clock Domain Crossing</strong>: Managing multiple clock domains in the interconnect</li>
        </ul>
        
        <h4>Test and Debug Infrastructure</h4>
        <p>Essential components for system verification and debugging:</p>
        <ul>
          <li><strong>JTAG Interface</strong>: Standard debug port implementation</li>
          <li><strong>Debug Module</strong>: RISC-V Debug Specification implementation</li>
          <li><strong>Trace Capability</strong>: Instruction and data trace for debugging</li>
          <li><strong>Performance Counters</strong>: Monitoring system metrics</li>
          <li><strong>UART Debug Console</strong>: Simple text-based debugging interface</li>
        </ul>
      `
    },
    {
      id: "13.4",
      title: "Commercial FPGA Platforms",
      content: `
        <h3>FPGA Platforms for RISC-V Implementation</h3>
        <p>A variety of commercial FPGA offerings provide different capabilities and price points for RISC-V development.</p>
        
        <h4>Xilinx/AMD FPGA Families</h4>
        <p>The Xilinx (now AMD) portfolio offers a range of options:</p>
        <ul>
          <li><strong>Artix</strong>: Cost-optimized FPGAs suitable for simple RISC-V cores</li>
          <li><strong>Kintex</strong>: Mid-range FPGAs for balanced performance and cost</li>
          <li><strong>Virtex</strong>: High-performance FPGAs for complex multi-core RISC-V systems</li>
          <li><strong>Versal</strong>: Adaptive Compute Acceleration Platforms (ACAP) combining FPGA, ARM cores, and AI engines</li>
          <li><strong>Zynq</strong>: SoC FPGAs with integrated ARM cores that can be complemented with RISC-V acceleration</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/jKl9Yj2.png" alt="FPGA Platform Comparison" style="max-width: 700px; width: 100%;">
          <p><em>Comparison of FPGA platforms for RISC-V implementation</em></p>
        </div>
        
        <h4>Intel FPGA Options</h4>
        <p>Intel offers several FPGA families suitable for RISC-V:</p>
        <ul>
          <li><strong>Cyclone</strong>: Low-cost FPGAs for simpler designs</li>
          <li><strong>Arria</strong>: Mid-range FPGAs with good performance/cost balance</li>
          <li><strong>Stratix</strong>: High-end FPGAs for complex systems</li>
          <li><strong>Agilex</strong>: Latest-generation FPGAs with advanced features</li>
          <li><strong>eASIC</strong>: Structured ASIC option for higher volume production</li>
        </ul>
        
        <h4>Microchip/Microsemi PolarFire</h4>
        <p>Microchip's PolarFire family offers unique advantages:</p>
        <ul>
          <li><strong>Low Power Consumption</strong>: Flash-based FPGAs with lower static power</li>
          <li><strong>PolarFire SoC</strong>: Integrated RISC-V hard cores (RV64GC) with FPGA fabric</li>
          <li><strong>Security Features</strong>: Enhanced security for IoT and industrial applications</li>
          <li><strong>Radiation Tolerance</strong>: Options for space and military applications</li>
          <li><strong>Mi-V Ecosystem</strong>: Microchip's RISC-V development platform</li>
        </ul>
        
        <h4>Lattice FPGA Solutions</h4>
        <p>Lattice specializes in small, low-power FPGAs:</p>
        <ul>
          <li><strong>ECP5</strong>: Excellent platform for moderate-complexity RISC-V systems</li>
          <li><strong>CrossLink</strong>: Optimized for video bridging applications</li>
          <li><strong>iCE40</strong>: Ultra-low power FPGAs for tiny RISC-V implementations</li>
          <li><strong>Certus-NX/Nexus</strong>: Newer platforms with enhanced capabilities</li>
          <li><strong>Lattice Propel</strong>: Design environment with RISC-V support</li>
        </ul>
        
        <h4>Emerging FPGA Vendors</h4>
        <p>New entrants offering interesting alternatives:</p>
        <ul>
          <li><strong>Efinix</strong>: Trion and Titanium FPGAs with innovative architecture</li>
          <li><strong>Achronix</strong>: High-performance Speedster FPGAs</li>
          <li><strong>QuickLogic</strong>: Ultra-low power FPGAs with embedded RISC-V options</li>
          <li><strong>Gowin</strong>: Cost-effective FPGAs gaining market share</li>
          <li><strong>Cologne Chip</strong>: GateMate FPGAs with European roots</li>
        </ul>
      `
    },
    {
      id: "13.5",
      title: "High-Level Synthesis",
      content: `
        <h3>Accelerating RISC-V Design with HLS</h3>
        <p>High-Level Synthesis (HLS) enables faster development of specialized accelerators and peripherals for RISC-V systems.</p>
        
        <h4>C/C++ to RTL Flows</h4>
        <p>Modern HLS tools transform high-level code into RTL:</p>
        <ul>
          <li><strong>Vitis HLS</strong>: AMD/Xilinx's HLS tool for C/C++/OpenCL to RTL</li>
          <li><strong>Intel HLS Compiler</strong>: Intel's C++ based HLS solution</li>
          <li><strong>Catapult HLS</strong>: Siemens EDA's commercial HLS tool</li>
          <li><strong>Stratus HLS</strong>: Cadence's HLS offering</li>
          <li><strong>LegUp</strong>: Academic/commercial open-source HLS</li>
          <li><strong>Bambu</strong>: Open-source HLS from Politecnico di Milano</li>
        </ul>
        
        <div style="text-align: center; margin: 20px 0;">
          <img src="https://i.imgur.com/RuW3tpV.png" alt="HLS Design Flow" style="max-width: 700px; width: 100%;">
          <p><em>High-Level Synthesis workflow for RISC-V accelerator development</em></p>
        </div>
        
        <h4>HLS Optimization Directives</h4>
        <p>Key directives that influence the generated hardware:</p>
        <ul>
          <li><strong>Loop Unrolling</strong>: Parallelizing loop iterations</li>
          <li><strong>Loop Pipelining</strong>: Overlapping loop iterations</li>
          <li><strong>Array Partitioning</strong>: Breaking arrays into multiple memories for parallel access</li>
          <li><strong>Function Inlining</strong>: Eliminating function call overhead</li>
          <li><strong>Interface Specification</strong>: Controlling port protocols (AXI, memory, etc.)</li>
          <li><strong>Resource Allocation</strong>: Limiting or specifying hardware resources</li>
        </ul>
        
        <h4>Interface Synthesis</h4>
        <p>Generating hardware interfaces for RISC-V integration:</p>
        <ul>
          <li><strong>AXI4/AXI4-Lite</strong>: Standard bus interfaces for SoC integration</li>
          <li><strong>Memory Interfaces</strong>: BRAM, external memory connections</li>
          <li><strong>Streaming Interfaces</strong>: AXI-Stream for data flow applications</li>
          <li><strong>Control Registers</strong>: Configuration and status register interfaces</li>
          <li><strong>DMA Interfaces</strong>: Efficient data movement</li>
        </ul>
        
        <h4>Verification of HLS Designs</h4>
        <p>Ensuring correctness of HLS-generated hardware:</p>
        <ul>
          <li><strong>C/C++ Testbenches</strong>: High-level verification before synthesis</li>
          <li><strong>Co-Simulation</strong>: Comparing C++ and RTL simulation results</li>
          <li><strong>Formal Equivalence Checking</strong>: Mathematically proving equivalence</li>
          <li><strong>Coverage Analysis</strong>: Ensuring complete verification</li>
          <li><strong>Hardware Emulation</strong>: FPGA-accelerated verification</li>
        </ul>
        
        <h4>Integration with Handwritten RTL</h4>
        <p>Combining HLS-generated components with traditional RTL:</p>
        <ul>
          <li><strong>Integration Interfaces</strong>: Clean boundaries between HLS and RTL blocks</li>
          <li><strong>Black Box Integration</strong>: Including RTL modules in HLS designs</li>
          <li><strong>Combined Verification</strong>: Testing integrated systems</li>
          <li><strong>Performance Analysis</strong>: Ensuring system-level timing closure</li>
          <li><strong>Implementation Strategies</strong>: Place and route considerations</li>
        </ul>
      `
    }
  ],
  examples: [
    {
      id: "example13_1",
      title: "FPGA Configuration for RISC-V Design",
      description: "XDC constraints file for a RISC-V processor implementation on a Xilinx Artix-7 FPGA",
      code: `# XDC Constraints for RISC-V Core on Digilent Arty A7-35T Board
# Clock signal
set_property -dict { PACKAGE_PIN E3 IOSTANDARD LVCMOS33 } [get_ports { clk_100mhz }];
create_clock -add -name sys_clk_pin -period 10.00 -waveform {0 5} [get_ports { clk_100mhz }];

# Reset signal
set_property -dict { PACKAGE_PIN C2 IOSTANDARD LVCMOS33 } [get_ports { reset_n }];

# UART pins
set_property -dict { PACKAGE_PIN D10 IOSTANDARD LVCMOS33 } [get_ports { uart_rxd }];
set_property -dict { PACKAGE_PIN A9  IOSTANDARD LVCMOS33 } [get_ports { uart_txd }];

# LEDs
set_property -dict { PACKAGE_PIN G6  IOSTANDARD LVCMOS33 } [get_ports { leds[0] }];
set_property -dict { PACKAGE_PIN G3  IOSTANDARD LVCMOS33 } [get_ports { leds[1] }];
set_property -dict { PACKAGE_PIN J3  IOSTANDARD LVCMOS33 } [get_ports { leds[2] }];
set_property -dict { PACKAGE_PIN K1  IOSTANDARD LVCMOS33 } [get_ports { leds[3] }];

# Switches
set_property -dict { PACKAGE_PIN A8  IOSTANDARD LVCMOS33 } [get_ports { switches[0] }];
set_property -dict { PACKAGE_PIN C11 IOSTANDARD LVCMOS33 } [get_ports { switches[1] }];
set_property -dict { PACKAGE_PIN C10 IOSTANDARD LVCMOS33 } [get_ports { switches[2] }];
set_property -dict { PACKAGE_PIN A10 IOSTANDARD LVCMOS33 } [get_ports { switches[3] }];

# JTAG interface
set_property -dict { PACKAGE_PIN F4 IOSTANDARD LVCMOS33 } [get_ports { jtag_tms }];
set_property -dict { PACKAGE_PIN F3 IOSTANDARD LVCMOS33 } [get_ports { jtag_tdi }];
set_property -dict { PACKAGE_PIN E2 IOSTANDARD LVCMOS33 } [get_ports { jtag_tdo }];
set_property -dict { PACKAGE_PIN D2 IOSTANDARD LVCMOS33 } [get_ports { jtag_tck }];

# Configuration settings
set_property CFGBVS VCCO [current_design];
set_property CONFIG_VOLTAGE 3.3 [current_design];

# Timing constraints
set_false_path -from [get_ports {reset_n}];
set_false_path -from [get_ports {switches*}];
set_false_path -to [get_ports {leds*}];

# Clock domain crossing constraints
set_max_delay -datapath_only -from [get_clocks clk_core] -to [get_clocks clk_periph] 5.0;
set_max_delay -datapath_only -from [get_clocks clk_periph] -to [get_clocks clk_core] 5.0;`,
    },
    {
      id: "example13_2",
      title: "RISC-V SoC Top-Level Design",
      description: "Top-level SystemVerilog module for a RISC-V SoC on FPGA",
      code: `module riscv_soc_top (
  input  logic        clk_100mhz,
  input  logic        reset_n,
  input  logic        uart_rxd,
  output logic        uart_txd,
  input  logic [3:0]  switches,
  output logic [3:0]  leds,
  // JTAG interface
  input  logic        jtag_tms,
  input  logic        jtag_tdi,
  output logic        jtag_tdo,
  input  logic        jtag_tck
);

  // Internal signals
  logic clk_core;          // Processor clock
  logic clk_periph;        // Peripheral clock
  logic pll_locked;        // PLL lock indicator
  logic reset_sync_n;      // Synchronized reset

  // Clocking wizard instantiation
  clk_wiz_0 clk_gen (
    .clk_in1(clk_100mhz),
    .clk_out1(clk_core),    // 50 MHz core clock
    .clk_out2(clk_periph),  // 25 MHz peripheral clock
    .reset(~reset_n),
    .locked(pll_locked)
  );

  // Reset synchronizer
  reset_sync reset_synchronizer (
    .clk(clk_core),
    .reset_n_in(reset_n & pll_locked),
    .reset_n_out(reset_sync_n)
  );

  // AXI interconnect signals
  // (simplified for brevity)
  logic [31:0] axi_awaddr, axi_araddr, axi_wdata, axi_rdata;
  logic axi_awvalid, axi_awready, axi_wvalid, axi_wready;
  logic axi_arvalid, axi_arready, axi_rvalid, axi_rready;
  
  // RISC-V processor core
  riscv_core #(
    .XLEN(32),
    .EXTENSION_C(1),
    .EXTENSION_M(1),
    .RESET_ADDR(32'h0000_0000)
  ) core (
    .clk(clk_core),
    .rst_n(reset_sync_n),
    // AXI Master interface
    .m_axi_awaddr(axi_awaddr),
    .m_axi_awvalid(axi_awvalid),
    .m_axi_awready(axi_awready),
    .m_axi_wdata(axi_wdata),
    .m_axi_wvalid(axi_wvalid),
    .m_axi_wready(axi_wready),
    .m_axi_araddr(axi_araddr),
    .m_axi_arvalid(axi_arvalid),
    .m_axi_arready(axi_arready),
    .m_axi_rdata(axi_rdata),
    .m_axi_rvalid(axi_rvalid),
    .m_axi_rready(axi_rready),
    // Debug interface
    .debug_tms(jtag_tms),
    .debug_tdi(jtag_tdi),
    .debug_tdo(jtag_tdo),
    .debug_tck(jtag_tck)
  );

  // Memory subsystem (BRAM-based)
  memory_subsystem #(
    .MEM_SIZE(32'h0001_0000)  // 64KB
  ) memory (
    .clk(clk_core),
    .rst_n(reset_sync_n),
    // AXI Slave interface
    .s_axi_awaddr(axi_awaddr),
    .s_axi_awvalid(axi_awvalid),
    .s_axi_awready(axi_awready),
    .s_axi_wdata(axi_wdata),
    .s_axi_wvalid(axi_wvalid),
    .s_axi_wready(axi_wready),
    .s_axi_araddr(axi_araddr),
    .s_axi_arvalid(axi_arvalid),
    .s_axi_arready(axi_arready),
    .s_axi_rdata(axi_rdata),
    .s_axi_rvalid(axi_rvalid),
    .s_axi_rready(axi_rready)
  );

  // UART controller
  uart_controller uart (
    .clk(clk_periph),
    .rst_n(reset_sync_n),
    .rx(uart_rxd),
    .tx(uart_txd),
    // AXI-Lite slave interface
    // (simplified for brevity)
  );

  // GPIO controller for LEDs and switches
  gpio_controller gpio (
    .clk(clk_periph),
    .rst_n(reset_sync_n),
    .switches(switches),
    .leds(leds),
    // AXI-Lite slave interface
    // (simplified for brevity)
  );

endmodule
`
    }
  ]
};

export default chapter13; 