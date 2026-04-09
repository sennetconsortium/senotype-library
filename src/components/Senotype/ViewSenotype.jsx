import AppAccordion from "@/components/layout/AppAccordion";
import React from "react";
import {Descriptions, Table} from 'antd';
import log from "xac-loglevel";

const buildSummary = (senotype) => {
    return [
        {
            key: '1',
            label: 'Name',
            children: senotype.senotype.name
        },
        {
            key: '2',
            label: 'Submitter',
            children: (
                <span className={'flex'}>
                    <div>{senotype.submitter.name.first} {senotype.submitter.name.last}</div>
                    <div><a href={`mailto:${senotype.submitter.email}`}>{senotype.submitter.email}</a></div>
                </span>
            )
        },
        {
            key: '3',
            label: 'Description',
            children: senotype.senotype.definition
        },

    ]
}

const buildSenotype = (senotype) => {
    let taxonChildren = senotype.assertions
        .filter(item => item.predicate?.term === "in_taxon")
        .flatMap(item => item.objects)
        .map(obj => obj.term);

    let locationChildren = senotype.assertions
        .filter(item => item.predicate?.term === "located_in")
        .flatMap(item => item.objects)
        .map(obj => obj.term);

    let celltypeChildren = senotype.assertions
        .filter(item => item.predicate?.term === "has_cell_type")
        .flatMap(item => item.objects)
        .map(obj => `${obj.code} (${obj.term})`);

    let hallmarkChildren = senotype.assertions
        .filter(item => item.predicate?.term === "has_hallmark")
        .flatMap(item => item.objects)
        .map(obj => obj.term);

    let microenvironmentChildren = senotype.assertions
        .filter(item => item.predicate?.term === "has_microenvironment")
        .flatMap(item => item.objects)
        .map(obj => obj.term);

    let inducerChildren = senotype.assertions
        .filter(item => item.predicate?.term === "has_inducer")
        .flatMap(item => item.objects)
        .map(obj => obj.term);

    let assayChildren = senotype.assertions
        .filter(item => item.predicate?.term === "has_assay")
        .flatMap(item => item.objects)
        .map(obj => obj.term);

    let diagnosisChildren = senotype.assertions
        .filter(item => item.predicate?.term === "has_diagnosis")
        .flatMap(item => item.objects)
        .map(obj => obj.term);

    log.info(microenvironmentChildren.length)
    let keyCounter = 4
    let items = [
        {
            key: '1',
            label: 'Taxon',
            children: <>
                {taxonChildren.map((item, index) => (
                    <>
                        {item}
                        {index < taxonChildren.length - 1 && <br/>}
                    </>
                ))}
            </>
        },
        {
            key: '2',
            label: 'Location',
            children: <>
                {locationChildren.map((item, index) => (
                    <>
                        {item}
                        {index < locationChildren.length - 1 && <br/>}
                    </>
                ))}
            </>
        },
        {
            key: '3',
            label: 'Celltype',
            children: <>
                {celltypeChildren.map((item, index) => (
                    <>
                        {item}
                        {index < celltypeChildren.length - 1 && <br/>}
                    </>
                ))}
            </>
        },
        {
            key: '4',
            label: 'Hallmark',
            children: <>
                {hallmarkChildren.map((item, index) => (
                    <>
                        {item}
                        {index < hallmarkChildren.length - 1 && <br/>}
                    </>
                ))}
            </>
        }
    ];
    if (microenvironmentChildren.length > 0) {
        keyCounter++
        items.push(
            {
                key: keyCounter,
                label: 'Microenvironment',
                children:
                    <>
                        {microenvironmentChildren.map((item, index) => (
                            <>
                                {item}
                                {index < microenvironmentChildren.length - 1 && <br/>}
                            </>
                        ))}
                    </>
            }
        )
    }

    if (inducerChildren.length > 0) {
        keyCounter++
        items.push(
            {
                key: keyCounter,
                label: 'Inducer',
                children:
                    <>
                        {inducerChildren.map((item, index) => (
                            <>
                                {item}
                                {index < inducerChildren.length - 1 && <br/>}
                            </>
                        ))}
                    </>
            }
        )
    }

    if (assayChildren.length > 0) {
        keyCounter++
        items.push(
            {
                key: keyCounter,
                label: 'Assay',
                children:
                    <>
                        {assayChildren.map((item, index) => (
                            <>
                                {item}
                                {index < assayChildren.length - 1 && <br/>}
                            </>
                        ))}
                    </>
            }
        )
    }

    if (diagnosisChildren.length > 0) {
        keyCounter++
        items.push(
            {
                key: keyCounter,
                label: 'Diagnosis',
                children:
                    <>
                        {diagnosisChildren.map((item, index) => (
                            <>
                                {item}
                                {index < diagnosisChildren.length - 1 && <br/>}
                            </>
                        ))}
                    </>
            }
        )
    }

    return items;
}

const buildDemographic = (senotype) => {
    let keyCounter = 0
    let items = []
    let sexChildren = senotype.assertions
        .filter(item => item.objects[0]?.term === "sex")
        .flatMap(item => item.objects)
        .map(obj => `${obj.value} ${obj.unit} (range: ${obj.lowerbound}-${obj.upperbound} ${obj.unit})`);

    let ageChildren = senotype.assertions
        .filter(item => item.objects[0]?.term === "age")
        .flatMap(item => item.objects)
        .map(obj => `${obj.value} ${obj.unit} (range: ${obj.lowerbound}-${obj.upperbound} ${obj.unit})`);

    let bmiChildren = senotype.assertions
        .filter(item => item.objects[0]?.term === "bmi")
        .flatMap(item => item.objects)
        .map(obj => `${obj.value} ${obj.unit} (range: ${obj.lowerbound}-${obj.upperbound} ${obj.unit})`);

    if (sexChildren.length > 0) {
        keyCounter++
        items.push(
            {
                key: keyCounter,
                label: 'Sex',
                children:
                    <>
                        {sexChildren.map((item, index) => (
                            <>
                                {item}
                                {index < sexChildren.length - 1 && <br/>}
                            </>
                        ))}
                    </>
            }
        )
    }

    if (ageChildren.length > 0) {
        keyCounter++
        items.push(
            {
                key: ageChildren,
                label: 'Age',
                children:
                    <>
                        {ageChildren.map((item, index) => (
                            <>
                                {item}
                                {index < ageChildren.length - 1 && <br/>}
                            </>
                        ))}
                    </>
            }
        )
    }

    if (bmiChildren.length > 0) {
        keyCounter++
        items.push(
            {
                key: bmiChildren,
                label: 'BMI',
                children:
                    <>
                        {bmiChildren.map((item, index) => (
                            <>
                                {item}
                                {index < bmiChildren.length - 1 && <br/>}
                            </>
                        ))}
                    </>
            }
        )
    }

    return items;
}

const buildReferences = (senotype) => {
    let keyCounter = 0
    let items = []
    let citationChildren = senotype.assertions
        .filter(item => item.predicate?.term === "has_citation")
        .flatMap(item => item.objects)
        .map(obj => `${obj.code} (${obj.term})`);

    let originChildren = senotype.assertions
        .filter(item => item.predicate?.term === "has_origin")
        .flatMap(item => item.objects)
        .map(obj => `${obj.code} (${obj.term})`);

    let datasetChildren = senotype.assertions
        .filter(item => item.predicate?.term === "has_dataset")
        .flatMap(item => item.objects)
        .map(obj => `${obj.code} (${obj.term})`);

    if (citationChildren.length > 0) {
        keyCounter++
        items.push(
            {
                key: keyCounter,
                label: 'Citation',
                children:
                    <span className={'flex'}>
                        {citationChildren.map((item, index) => (
                            <div key={`citation_${index}`} className={'mb-2'}>
                                {item}
                            </div>
                        ))}
                    </span>
            }
        )
    }

    if (originChildren.length > 0) {
        keyCounter++
        items.push(
            {
                key: originChildren,
                label: 'Origin',
                children:
                    <span className={'flex'}>
                        {originChildren.map((item, index) => (
                            <div key={`origin_${index}`} className={'mb-2'}>
                                {item}
                            </div>
                        ))}
                    </span>
            }
        )
    }

    if (datasetChildren.length > 0) {
        keyCounter++
        items.push(
            {
                key: datasetChildren,
                label: 'BMI',
                children:
                    <span className={'flex'}>
                        {datasetChildren.map((item, index) => (
                            <div key={`dataset_${index}`} className={'mb-2'}>
                                {item}
                            </div>
                        ))}
                    </span>
            }
        )
    }

    return items;
}

export default function ViewSenotype({senotype}) {
    return (
        <>
            <AppAccordion title={'Summary'}>
                <Descriptions items={buildSummary(senotype)}/>
            </AppAccordion>

            <AppAccordion title={'Senotype'}>
                <Descriptions items={buildSenotype(senotype)}/>
            </AppAccordion>

            {buildDemographic(senotype).length > 0 &&
                <AppAccordion title={'Demographic'}>
                    <Descriptions items={buildDemographic(senotype)}/>
                </AppAccordion>
            }

            {buildReferences(senotype).length > 0 &&
                <AppAccordion title={'References'}>
                    <Descriptions items={buildReferences(senotype)}/>
                </AppAccordion>
            }

            <AppAccordion title={'Specified Markers'}>
                <Table ></Table>
            </AppAccordion>
        </>
    )
}