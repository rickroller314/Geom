# Geom
Geometric algebra library


Functions:  
- [x] U+V  
- [ ] U-v  
- [x] UV  
- [ ] U/V  
- [ ] u^V  
- [ ] U.V  
- [ ] e\*\*M  
- [ ] ln(M)  
- [ ] U\*\*V  

# to and from string
Here is the format:  
"{scalar 1}:{term label in binary}+{scalar e}:{term label in binary}+{...}"  
Lets start with the following multivector: 5+6e1+7e2-3e21  
Note the backwards numbering. This is important.  
This gets represented as "5:0+6:1+7:10+-3:11"  
This means that e1 becomes the LSB, e2 becomes the next bit, e3 becomes the next bit, and so on.
This allows us to have infinite dimensions to work with (or just 64)
