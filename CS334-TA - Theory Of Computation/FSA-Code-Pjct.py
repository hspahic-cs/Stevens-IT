from audioop import cross
import math
import pandas as pd

'''
Definining class for standard DFA

Attributes: 
    (Set{str}) states --> Set containing all possible states in FSA
    (Set{str}) alphabet --> Set containing alphabet
    (pd.Dataframe[states][alphabet] delta --> transitions from each state
    (str) q0 --> State which DFA starts in
    (str) qF --> accept state
    
Methods:
    __call__(input_str: list[str]) -> bool : simulates input string on DFA, returns true if accepted
'''

class DFA:
    def __init__ (self, states: set, alphabet: set, delta: pd.DataFrame, q0: str, qF: str):
        
        # Error handling
        error_found = False
        missing_args = []
        
        if(not states):
            missing_args.append(states)

        if(not alphabet):
            missing_args.append(alphabet)
        
        if(not q0):
            missing_args.append(q0)
        
        if(not qF):
            missing_args.append(qF)
        
        for arg in missing_args:
            print(f" Error: {arg} cannot be empty ".center(100, "o"))
            error_found = True
        
        
        # Checking validity of transition matrix
        if(set(delta.index) != alphabet or set(delta.columns) != states):
            print(f" Error: delta must be in form 'states x alphabet' ".center(100, "o"))
            error_found = True
        
        if(delta.isnull().values.any()):
            print(f" Error: transition for state in DFA undefined ".center(100, "o"))
            error_found = True
        
        if(not delta.isin(states).all().all()):
            print(f" Error: Transition defined to invalid state ".center(100, "o"))
            error_found = True


        # Make sure q0 & qF are valid states
        if(not q0 in states):
            print(f" Error: q0 assigned to invalid state ".center(100, "o"))
            error_found = True
        
        acpt_missing = False

        for accept in qF:
            if(not accept in states):
                acpt_missing = True

        if(acpt_missing):
            print(f" Error: qF contains invalid state ".center(100, "o"))
            error_found = True


        # Exit if error encountered
        if(error_found):
            exit()     


        # Finish error handling, exit if issue found
        self.states = states
        self.alphabet = alphabet
        self.delta = delta
        self.q0 = q0
        self.qF = qF

        print("Successfully initialized DFA")

    '''
    Simulates input on DFA, returns true if found
    (list[str]) input_str --> input string to be simulated
    '''
    def __call__(self, input_str: list[str]) -> bool:        

        print(f"\nAttempting to run simulation on input: {input_str}")

        # Check input string is valid
        for elem in input_str:
            if(not elem in self.alphabet):
                print(f" invalid char {elem} in input string ".center(100, "o"))
                exit()

        trace_back = []

        # Initial state q0 + define a record of all transitioned states
        cur_state = self.q0
        trace_back.append(cur_state)

        # Traverse DFA
        for elem in input_str:
            cur_state = self.delta[cur_state][elem]
            trace_back.append(cur_state)

        # Print trace
        print()
        for i in range(len(trace_back) - 1):
            print(f"{trace_back[i]} x {input_str[i]} --> {trace_back[i + 1]} ")

        # Return result
        if(cur_state in self.qF):
            print(f"\nInput: Accepted")
            return True
        
        print("\nInput: Rejected")
        return False

'''
Takes two DFA's and returns their union || Assumse DFA1 & DFA2 shares same alphabet
(DFA) DFA1 -> 1st DFA
(DFA) DFA2 -> 2nd DFA
'''
def DFA_union(DFA1: DFA, DFA2: DFA) -> DFA:
    u_alphabet = DFA1.alphabet.union(DFA2.alphabet)
    u_q0 = DFA1.q0 + "/" + DFA2.q0
    
    # Helper function to cross two sets
    def cross_product(set1, set2):
        total_set = set()
        for elem1 in set1:
            for elem2 in set2:
                total_set.add(elem1 + "/" + elem2)
        return total_set
    
    # Define cross product for states & accept states
    u_states = cross_product(DFA1.states, DFA2.states)
    u_qF = cross_product(DFA1.qF, DFA2.states).union(cross_product(DFA1.states,DFA2.qF))

    assert len(u_states) == len(DFA1.states) * len(DFA2.states)
    
    # Create transition array for crossproduct of DFAs
    u_transitions = {}

    for state in u_states:
        total_states = state.split("/")
        cur_state_transitions = []
        state1 = total_states[0]
        state2 = total_states[1]

        for letter in u_alphabet:                    
            transition1 = state1
            transition2 = state2

            if letter in DFA1.alphabet:
                transition1 = DFA1.delta[state1][letter]
            if letter in DFA2.alphabet:
                transition2 = DFA2.delta[state2][letter]
            
            cur_state_transitions.append(transition1 + "/" + transition2)
        
        u_transitions[state] = cur_state_transitions

    u_delta = pd.DataFrame(u_transitions, index=u_alphabet)
    
    # Construct DFA
    return DFA(u_states, u_alphabet, u_delta, u_q0, u_qF)
        

if __name__ == "__main__":
    print()

    states = {"q1", "q2", "q3"}
    alphabet = {"1", "0"}
    delta = pd.DataFrame({'q1':['q1', 'q2'], 'q2':['q3', 'q2'], 'q3':['q2', 'q2']}, index=["0", "1"])
    q0 = 'q1'
    qF = ['q2']
    dfa = DFA(states, alphabet, delta, q0, qF)
    #test_dfa([str(x) for x in "1001101"])


    states2 = {"q1", "q2"}
    alphabet2 = {"a", "b"}
    delta2 = pd.DataFrame({'q1':['q1', 'q2'], 'q2':['q1', 'q2']}, index = ['a', 'b'])
    q02 = 'q1'
    qF2 = ['q2']
    dfa2 = DFA(states2, alphabet2, delta2, q02, qF2)

    x = DFA_union(dfa, dfa2)
    x([str(x) for x in "ab11010baa"])

    



