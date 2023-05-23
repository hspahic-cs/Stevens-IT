#include <stdlib.h>
#include <stdio.h>
#include "mergesort.h"

int int_cmp(const void* a, const void* b){
    return (* (int*) a) <= (* (int* ) b);
};

int dbl_cmp(const void* a, const void* b){
    return (* (double*) a) <= (* (double *) b);
};

void merge(size_t left, size_t right, size_t mid, void* array, size_t len, size_t elem_sz, int (*comp)(const void*, const void*)){
    // Initialize indices
    size_t i, j, k;
    size_t n1 = mid - left + 1;
    size_t n2 = right - mid;
    char* arr = (char*)array;
    
    char* L = (char*)malloc(elem_sz * n1);
    char* R = (char*)malloc(elem_sz * n2);

    for(size_t i = 0; i < n1; i++){
        for(size_t n = 0; n < elem_sz; n++){
            *(L + (i * elem_sz + n)) = *(arr + (left + i) * elem_sz + n);
        }
    }

    for(size_t j = 0; j < n2; j++){
        for(size_t n= 0; n < elem_sz; n++){
            *(R + (j * elem_sz) + n) = *(arr + (mid + 1 + j) * elem_sz + n);
        }
    }

    i = 0; j = 0; k = left;
    while(i < n1 && j < n2){
        if(comp(L + elem_sz * i, R + elem_sz * j)){
            for(size_t n = 0; n < elem_sz; n++){
                *(arr + k * elem_sz + n) = *(L + i * elem_sz + n);
            }
            i++;
        }
        else{
            for(size_t n = 0; n < elem_sz; n++){
                *(arr + k * elem_sz + n) = *(R + j * elem_sz + n);
            }
            j++;
        }
        k++;
    }
    while(i < n1){
        for(size_t n = 0; n < elem_sz; n++){
            *(arr + k * elem_sz + n) = *(L + i * elem_sz + n);
        }
        i++;
        k++;
    }

    while(j < n2){
        for(size_t n = 0; n < elem_sz; n++){
            *(arr + k * elem_sz + n) = *(R + j * elem_sz + n);
        }
        j++;
        k++;
    }
    
    free(L);
    free(R);
} 


void sortHelper(int left, int right, void* array, size_t len, size_t elem_sz, int (*comp)(const void*, const void*)){
    if(left < right){
        int mid = left + (right - left) / 2;
        sortHelper(left, mid, array, len, elem_sz, comp);
        sortHelper(mid + 1, right, array, len, elem_sz, comp);
        merge(left, right, mid , array, len, elem_sz, comp);
    }   
}

void mergesort(void* array, size_t len, size_t elem_sz, int (*comp)(const void*, const void*)){
    sortHelper(0, len-1, array, len, elem_sz, comp);
}

